struct FS_Input {
  float4 position  : POSITION;
  float4 color     : COLOR;
  float4 bnormal   : TEXCOORD7;


#ifdef diffuseTexture
  float2 texcoord0 : TEXCOORD0;
#endif

  float4 normal      : TEXCOORD1;
  float4 objPosition : TEXCOORD2;

#ifdef shadows
  float4 shPosition : TEXCOORD3;
#endif

#ifdef displace
  float3 screenPos     : TEXCOORD4;
#endif
#ifdef water
  float4 waterDepth : TEXCOORD5;
#endif
    };

struct FS_Output {
    float4 accum    : COLOR0;
#ifdef gbuffer
    float4 diffuse  : COLOR1;
    float4 normal   : COLOR2;
    float4 position : COLOR3;
#endif
    };

float shadowMapValue( in sampler2D shadowMap, float2 smPos, float zv ){
    float z = tex2D( shadowMap, smPos ).z;

    return 1.0 - clamp( 75.0*(zv - z), 0.0, 1.0 );
    }

float shadowMapValue( in sampler2D shadowMap, float4 shPosition ){
    float2 smPos = shPosition.xy*0.5+float2( 0.5 );
    smPos.y = 1.0-smPos.y;

    float2 dx = float2(0.5, 0)/1024;
    float2 dy = float2(0, dx.x);

    float2 dx2 = float2(1.25, 0)/1024;
    float2 dy2 = float2(0, dx2.x);

    //return shadowMapValue( shadowMap, smPos, shPosition.z );
/*
    return(shadowMapValue( shadowMap, smPos-dx, shPosition.z ) +
           shadowMapValue( shadowMap, smPos+dx, shPosition.z ) +
           shadowMapValue( shadowMap, smPos+dy, shPosition.z ) +
           shadowMapValue( shadowMap, smPos-dy, shPosition.z ))*0.25;*/

    float f0 =  shadowMapValue( shadowMap, smPos, shPosition.z );
    float fetc1 = (shadowMapValue( shadowMap, smPos-dx, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos+dx, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos+dy, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos-dy, shPosition.z ))*0.25;

    float fetc2 = (shadowMapValue( shadowMap, smPos-dx2, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos+dx2, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos+dy2, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos-dy2, shPosition.z ))*0.25;

    return (f0*0.25 + fetc1*0.45 + fetc2*0.3) +
           pow(shPosition.x, 8) + pow(shPosition.y, 8);
    }

float fresnel(float VdotN, float eta) {
   /*
   ( O*cos(A) - sqrt( 1 - (eta*sin(O))^2 )/
     O*cos(A) - sqrt( 1 - (eta*sin(O))^2 ) )^2
   */
   float sqr_eta = eta * eta;
   float etaCos = eta * VdotN;
   float sqr_etaCos = etaCos*etaCos;
   float one_minSqrEta = 1.0 - sqr_eta;
   float value = etaCos - sqrt(one_minSqrEta + sqr_etaCos);

   value *= value / one_minSqrEta;
   return min(1.0, value * value);
   }

float3 computeNormal( in FS_Input input, sampler2D nMap ){
#ifdef diffuseTexture
  float3 bn = normalize( input.bnormal.xyz );
  float3 nn = normalize( input. normal.xyz );

  float3 n  = tex2D( nMap, input.texcoord0 ).xyz*2.0 - float3(1.0);
  float3 tn = cross(nn, bn);

  return normalize(n.x*bn + n.y*tn + n.z*nn);
#else
  return input.normal.xyz;
#endif
  }

float computeWaterDepth( float3    screenPos,
                         float4    objPosition,
                         float4x4  invMatrix,
                         sampler2D sceneDepth,
                         float2 dTexCoord ){
  float2 tx = screenPos.xy;
  tx = 0.5*(tx+float2(1.0));
  tx.y = 1.0-tx.y;

  tx += dTexCoord*0.5;

  float4 pos = float4(screenPos.xyz, 1);
  pos.z = tex2D( sceneDepth, tx ).r;
  pos = mul(invMatrix, pos);
  pos /= pos.w;
  pos = (pos-objPosition);

  float waterDepth = 1.5*length(pos);
  waterDepth = clamp(waterDepth, 0, 1 );

  return waterDepth;
  }

float computeLambert( float3 normal,
                      float3 lightDirection,
                      sampler2D shadowMap,
                      float4 shPosition ){
    float l = 1;
#ifdef lambert
  #ifndef water
    l = -dot( normal, lightDirection );
  #else
    l = max(0, (-dot( normal, lightDirection )+0.5)/1.5);
    // l = mix(l, 1.0, frsn); // wtf?
  #endif
    l = clamp(l, 0, 1);
#endif//lambert

#  ifdef shadows
    float4 smPos = shPosition;
      #ifdef water
      smPos.xy += 15*normal.xy/1024.0;
      #endif
    float smValue = shadowMapValue( shadowMap, smPos );
    l = min( smValue, l );
#  endif//shadows

  return l;
  }

FS_Output main( FS_Input input
#ifdef diffuseTexture
                ,uniform sampler2D texture
#endif
#ifdef bumpMapping
                ,uniform sampler2D normalMap
#endif
#ifdef shadows
                ,uniform sampler2D shadowMap
#endif
#ifdef lighting
                ,uniform float3 lightDirection
                ,uniform float3 lightColor
                ,uniform float3 lightAblimient
#endif
#ifdef displace
                ,uniform sampler2D scene
                ,uniform sampler2D sceneDepth
                ,uniform float2 dTexCoord
                ,uniform float4x4 mvpMatrix
#endif
#ifdef water
                ,uniform float2 dWaterCoord
                ,uniform float4x4 invMatrix
                ,uniform sampler2D normalMap
                ,uniform sampler2D envMap
#endif
#ifdef specular
                ,uniform float  specularFactor
                ,uniform float3 view
#endif
#ifdef teamColor
                ,uniform float3 tmColor
#endif
#ifdef perlnFade
                ,uniform sampler2D noise2DTex
                ,uniform float     noiseRef
#endif
                ) {
    FS_Output ret;
    float lambertVal = 1;

#ifdef perlnFade
    float n = tex2D( noise2DTex, input.texcoord0 ).r;
    if( n<noiseRef )
      discard;
#endif

#ifdef water
    float3 normal  = tex2D( normalMap, input.texcoord0+dWaterCoord*input.waterDepth.xy  ).rgb*2-float3(1.0);
#else
#  ifdef bumpMapping
    float3 normal  = computeNormal(input, normalMap);
#  else
    float3 normal  = normalize(input.normal.xyz).xyz;
#  endif
#endif
    float4 diffuse;
    
#ifdef diffuseTexture
	#ifdef water
    float waterDepth = computeWaterDepth( input.screenPos,
                                          input.objPosition,
                                          invMatrix,
                                          sceneDepth,
                                          dTexCoord );

    diffuse = tex2D( texture, input.texcoord0+
                              waterDepth*dWaterCoord*input.waterDepth.xy );
    diffuse.r *= max( 1-waterDepth*0.08,         0.0 );
    diffuse.g *= max( 1-waterDepth*0.04,         0.1 );
    diffuse.a  = min( diffuse.a+waterDepth*0.09,   1 );
    diffuse   *= input.color;

    float frsn = fresnel( dot( normal, -view ), 1.6330 );
    { float3 cl = tex2D( envMap, input.texcoord0 ).rgb;

      diffuse = mix( diffuse, float4(cl, diffuse.a), frsn );
      }
	#else
    diffuse = input.color*tex2D( texture, input.texcoord0 );
	#endif
#else
    diffuse = float4(0);
#endif

#ifdef teamColor
    diffuse.rgb += tmColor*(1.0-diffuse.a);
    if( diffuse.a==0 )
      discard;
#endif

    float4 albedo = diffuse;
    ret.accum = diffuse;

#ifdef shadows
    lambertVal = computeLambert( normal,
                                 lightDirection,
                                 shadowMap,
                                 input.shPosition );
#else
#ifdef lighting
    lambertVal = computeLambert( normal,
                                 lightDirection,
                                 shadowMap,
                                 float4(0.0) );
#endif
#endif

#ifdef lighting
    diffuse.rgb *= float4( ( lightColor*lambertVal + lightAblimient ), 1 );
#endif

#ifdef displace
    {
    float2 tx = input.screenPos.xy;
    float sz  = input.screenPos.z;

    float4 nt       = mul( mvpMatrix, float4(normal, 0) );
    float3 ssnormal = normalize(nt.xyz/nt.w);
	#ifdef water
    //ssnormal = normal;
    ssnormal.xy *= -1*pow( waterDepth, 2 );
	#endif

    tx = 0.5*(tx+float2(1.0));
    tx.y = 1.0-tx.y;

    tx += dTexCoord*0.5;
    float4 refColor = mix( tex2D( scene, tx.xy - 0.5*ssnormal.xy*(1.0-sz)  ),
                           tex2D( scene, tx.xy ), 0.2 );
	
	#ifndef water
    refColor += 0.5*float4(0,0.5,1,0)*pow( 1.0-abs(ssnormal.z), 8 );
  #else
    refColor = mix( refColor, diffuse, diffuse.a*waterDepth );
	#endif
        
 #  ifdef water
    ret.accum = refColor;
    diffuse   = refColor;
 #  else
    ret.accum += refColor;
    diffuse   += refColor;
 #  endif
    }
#endif //displace

    ret.accum = diffuse;

#ifdef specular
    float3 r   = reflect(lightDirection, normal);
    float spec = max(0, dot( r, -view ));

    //ret.accum = float4(lightDirection, 1);
    float specularFromD = 0.2126*diffuse.r + 0.7152*diffuse.g + 0.0722*diffuse.b;
    specularFromD *= specularFactor;
#   ifdef lambert
    ret.accum.rgb += float3( lambertVal*specularFromD*lightColor*pow( spec, 40 ));
#   else
    ret.accum.rgb += float3( specularFromD*lightColor*pow( spec, 40 ));
#   endif
#endif
    //ret.accum = float4(l,l,l, 1.0);

#ifdef gbuffer
    ret.diffuse     = albedo;
    //ret.accum.xyz = normal;
    //ret.diffuse.xyz = normal;

    ret.normal.xyz = (normal*0.5+float3(0.5));
    //ret.normal     = input.normal.a;//float4( normal, input.normal.a );
    ret.position   = float4(input.normal.a,0,0,1);
#ifdef terrain
    ret.normal.xyz   *= input.color.a;
    ret.position.xyz *= input.color.a;
#endif

#endif
    //ret.accum.r *= 20;

    return ret;
    }
