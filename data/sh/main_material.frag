#ifdef opengl
#ifndef oes_render
#define lowp
#endif

#ifdef diffuseTexture
  uniform sampler2D texture;
#endif
#if bumpMapping
  uniform sampler2D normalMap;
#endif

#if shadows
  uniform sampler2D shadowMap;
#endif

#ifdef shadowsColored
  uniform sampler2D shadowMapCl;
#endif

#if oclusion
  uniform sampler2D oclusionMap;
#endif

#ifdef lighting
  uniform vec3 lightDirection;
  uniform vec3 lightColor;
  uniform vec3 lightAblimient;
#endif

#ifdef displace
  uniform sampler2D scene;
  uniform sampler2D sceneDepth;
  uniform vec4 dTexCoord;
  uniform mat4 mvpMatrix;
#endif
#ifdef water
  uniform vec2      dWaterCoord;
  uniform mat4      invMatrix;
  uniform sampler2D normalMap;
  uniform sampler2D envMap;
#endif
#ifdef specular
  uniform float  specularFactor;
  uniform vec3 view;
#endif
#ifdef teamColor
  uniform vec3 tmColor;
#endif
#ifdef perlnFade
  uniform sampler2D noise2DTex;
  uniform float     noiseRef;
#endif

varying lowp vec2 tc;
varying vec3 normal;
#if bumpMapping
varying vec3 bnormal, tnormal;
#endif
//varying lowp vec4 cl;
#if shadows
varying vec3 shPos;
#endif
#if oclusion
varying lowp vec3 oclusionPos;
#endif

#ifdef terrainCL
varying lowp float terrainColorMul;
#endif

#if oclusion    
  float computeAO( sampler2D aoTex, vec3 pos ){
    vec3 shPos = pos;

	#ifdef oes_render
    float z = shPos.z-0.1;//texRECT(texture, shPos.xy).r;
	#else
    float z = shPos.z;//texRECT(texture, shPos.xy).r;
	#endif

    vec4 tex = texture2D( aoTex, shPos.xy );

    float aR = max( 1.0 - 10.0*(z-0.05-tex.r), 0.2 );
    float aG = max( 1.0 - 10.0*(shPos.z-tex.g), 0.2 );
    float aB = max( 1.1 -  5.0*(shPos.z-tex.b), 0.2 );
    //aB = 1-(1-aB-0.6)/0.4;
	
	//aR = aR*aR*aR;
	aR = (aR-0.3)/0.7;
	//aG = aG*aG;
	//aG = (aG-0.3)/0.7;
	    
    float aoVal;// = max( min( max(aG,aB), aR), 0.0 );
	aoVal = min(aB, aG);

    vec2 mulT = shPos.xy*2.0 - 1.0;
    float mul = max( abs(mulT.x), abs(mulT.y) );
    mul = 1.0 - max(mul-0.9, 0.0)/0.1;

    return (clamp( mix(1.0, aoVal, mul), 0.1, 1.0 ));
    }
#endif

#if bumpMapping
vec3 norm(){
  vec3 x = texture2D(normalMap, tc).xyz*2.0-vec3(1.0);  
  return x.x*bnormal + x.y*tnormal + x.z*normal;
  }
#else
vec3 norm(){
  return normal;//normalize(normal);
  }
#endif

float shadowMapValue( in sampler2D shadowMap, in vec2 smPos, in  float zv ){
  float z = texture2D( shadowMap, smPos ).b;// Hello, RGB565!

  #if settings_shadowmapres>=1024
  return 1.0 - clamp( (zv-z)*75.0, 0.0, 1.0 );
  #else
  return 1.0 - clamp( (zv-z)*50.0, 0.0, 1.0 );
  #endif
  }

float shadowMapValue( in sampler2D shadowMap, vec3 shPosition ){	
    vec2 mulT = shPosition.xy*2.0 - vec2(1.0);
    float mul = max( abs(mulT.x), abs(mulT.y) );
    mul = max(mul-0.9, 0.0)/0.1;
	
    vec2 smPos = shPosition.xy;//shPosition.xy*0.5+vec2( 0.5 );

    float f0 =  shadowMapValue( shadowMap, smPos, shPosition.z );
    
    #if settings_shadowmapfilter >=1
    vec2 dx = vec2(1.0, 0.0)/float(settings_shadowmapres);
    vec2 dy = vec2(0.0, dx.x);

    vec2 dx2 = vec2(2.5, 0.0)/float(settings_shadowmapres);
    vec2 dy2 = vec2(0.0, dx2.x);
	
    float fetc1 = (shadowMapValue( shadowMap, smPos-dx, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos+dx, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos+dy, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos-dy, shPosition.z ))*0.25;
      #if settings_shadowmapfilter ==1
      return fetc1*0.5+f0*0.5+mul;
      #endif
    #endif

    #if settings_shadowmapfilter >=2
    float fetc2 = (shadowMapValue( shadowMap, smPos-dx2, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos+dx2, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos+dy2, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos-dy2, shPosition.z ))*0.25;
    return (f0*0.4 + fetc1*0.4 + fetc2*0.2) + mul;
    #endif

    return f0 + mul;
    }
	
void main() { 
#ifdef diffuseTexture
  vec4 diff = texture2D(texture, tc);
  //vec4 diff = cl*texture2D(texture, tc);
#else
  vec4 diff = vec4(0.0);
  //vec4 diff = cl;
#endif

#ifdef alpha_test
#ifndef oes_render
  if( alpha_test )
    discard;
#endif
#endif

#ifdef terrainCL
  diff*=terrainColorMul;
#endif

#ifdef teamColor
   diff.rgb += tmColor*(1.0-diff.a);
#endif
    
  float l = 1.0;
#ifdef lighting
  l = max( dot( norm(), lightDirection), 0.0 );
#endif

#if shadows
  l = min( l, shadowMapValue(shadowMap, shPos) );
#endif
 
#ifdef lighting
  float ao = 1.0;
#if oclusion
  ao = computeAO(oclusionMap, oclusionPos);
#endif
  diff.rgb *= (l*lightColor + lightAblimient*ao);
  //diff.rgb = ao;
#endif

  gl_FragColor = diff;
  //gl_FragData[0] = vec4(1.0);//vec4(diff.rgb, 1.0);
  }
  
#else

struct FS_Input {
  float4 position  : POSITION;
  //float4 color     : COLOR;
  float4 bnormal           : TEXCOORD7;
#ifdef terrainCL
  float  terrainColorMul   : TEXCOORD8;
#endif

#ifdef diffuseTexture
  float2 texcoord0 : TEXCOORD0;
#endif

  float4 normal      : TEXCOORD1;
  float4 objPosition : TEXCOORD2;

#if shadows
  float4 shPosition : TEXCOORD3;
#endif

#ifdef displace
  float3 screenPos     : TEXCOORD4;
#endif
#ifdef water
  float4 waterDepth : TEXCOORD5;
#endif

#if oclusion
  float4 oclusionPos: TEXCOORD6;
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
    float z = tex2D( shadowMap, smPos ).b;

    return 1.0 - clamp( 75.0*(zv - z), 0.0, 1.0 );
    }

float shadowMapValue( in sampler2D shadowMap, float4 shPosition ){
    float2 smPos = shPosition.xy*0.5+float2( 0.5 );
    smPos.y = 1.0-smPos.y;

    float2 dx = float2(1, 0)/settings_shadowmapres;
    float2 dy = float2(0, dx.x);

    float2 dx2 = float2(2.5, 0)/settings_shadowmapres;
    float2 dy2 = float2(0, dx2.x);

    float f0 =  shadowMapValue( shadowMap, smPos, shPosition.z );
    
    #if settings_shadowmapfilter >=1
    float fetc1 = (shadowMapValue( shadowMap, smPos-dx, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos+dx, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos+dy, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos-dy, shPosition.z ))*0.25;
      #if settings_shadowmapfilter ==1
      return fetc1*0.5+f0*0.5+
             pow(shPosition.x, 8) + pow(shPosition.y, 8);
      #endif
    #endif

    #if settings_shadowmapfilter >=2
    float fetc2 = (shadowMapValue( shadowMap, smPos-dx2, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos+dx2, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos+dy2, shPosition.z ) +
                   shadowMapValue( shadowMap, smPos-dy2, shPosition.z ))*0.25;
    return (f0*0.4 + fetc1*0.4 + fetc2*0.2) +
           pow(shPosition.x, 8) + pow(shPosition.y, 8);
    #endif

    return f0 + pow(shPosition.x, 8) + pow(shPosition.y, 8);
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
  
#if oclusion
    
  float computeAO( sampler2DRect aoTex, float4 pos ){
    float4 shPos = pos;

    float z = shPos.z-0.05;//texRECT(texture, shPos.xy).r;

    float4 tex = texRECTlod( aoTex, float4(shPos.xy, 0, 0) );

    float aR = max( 1.0 -  5.0*(z-tex.r), 0.2 );
    float aG = max( 1.0 - 10.0*(shPos.z-tex.g), 0.2 );
    float aB = max( 1.1 -  5.0*(shPos.z-tex.b), 0.2 );
    //aB = 1-(1-aB-0.6)/0.4;
	
	//aR = aR*aR*aR;
	aR = (aR-0.3)/0.7;
	//aG = aG*aG;
	//aG = (aG-0.3)/0.7;
	    
    float aoVal;// = max( min( max(aG,aB), aR), 0.0 );
	aoVal = min(aB,aG);

    float2 mulT = shPos.xy*2 - 1;
    float mul = max( abs(mulT.x), abs(mulT.y) );
    mul = 1.0 - max(mul-0.9, 0)/0.1;

    return clamp( mix(1, aoVal, mul), 0.1, 1 );
    }
#endif

float computeLambert( float3 normal
                      ,float3 lightDirection
#if shadows
                      ,sampler2D shadowMap
                      ,float4 shPosition
#endif
					  ){
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

#if shadows
    float4 smPos = shPosition;
      #ifdef water
      smPos.xy += 15*normal.xy/1024.0;
      #endif
    float smValue = shadowMapValue( shadowMap, smPos );
    l = min( smValue, l );
#endif//shadows

  return l;
  }

float3 computeLightColor( sampler2D shadowMap,
                          uniform sampler2D shadowMapCl,
                          float3 shPosition ){
  float2 smC = shPosition.xy*0.5+float2( 0.5 );
  return tex2D( shadowMapCl, smC ).rgb;
  }

FS_Output main( FS_Input input
#ifdef diffuseTexture
                ,uniform sampler2D texture
#endif
#if bumpMapping
                ,uniform sampler2D normalMap
#endif

#if shadows
                ,uniform sampler2D shadowMap
#endif
#ifdef shadowsColored
                ,uniform sampler2D shadowMapCl
#endif
#if oclusion
                ,uniform sampler2DRect oclusionMap
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
    float3 lambertVal = float3(1);
	float4 color = float4(1);
#ifdef terrainCL
    color *= input.terrainColorMul;
#endif

#ifdef perlnFade
    float n = tex2D( noise2DTex, input.texcoord0 ).r;
    if( n<noiseRef )
      discard;
#endif

#ifdef water
    float3 normal  = tex2D( normalMap, input.texcoord0+dWaterCoord*input.waterDepth.xy  ).rgb*2-float3(1.0);
#else
#  if bumpMapping
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
    diffuse.a  = min( diffuse.a+waterDepth*0.05,   1 );
    diffuse   *= color;

    float frsn = fresnel( dot( normal, -view ), 1.6330 );
    { float3 cl = tex2D( envMap, input.texcoord0 ).rgb;

      diffuse = mix( diffuse, float4(cl, diffuse.a), frsn );
      }
	#else
    //diffuse = input.color*tex2D( texture, input.texcoord0 );
    diffuse = color*tex2D( texture, input.texcoord0 );
	#endif
#else
    diffuse = float4(0.0);
#endif

#ifdef alpha_test
{
  float4 diff = diffuse;
  if( alpha_test )
    discard;	
}
#endif

#ifdef teamColor
    diffuse.rgb += tmColor*(1.0-diffuse.a);
    if( diffuse.a==0 )
      discard;
#endif

    float4 albedo = diffuse;
    ret.accum = diffuse;

#if shadows
    lambertVal = computeLambert( normal,
                                 lightDirection,
                                 shadowMap,
                                 input.shPosition );
#else
#ifdef lighting
    lambertVal = computeLambert( normal,
                                 lightDirection );
#endif
#endif

#ifdef lighting
    float ao = 1.0;
#if oclusion
    ao = computeAO(oclusionMap, input.oclusionPos);
#endif

#ifdef shadowsColored
    diffuse.rgb *= float3( ( computeLightColor( shadowMap,
                                                shadowMapCl,
                                                input.shPosition )*lambertVal
                             + lightAblimient*ao ) );
#else
    diffuse.rgb *= float3( ( lightColor*lambertVal + lightAblimient*ao ) );
#endif
    //diffuse.rgb = ao*input.color.a;

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
    ret.normal.xyz   *= color.a;
    ret.position.xyz *= color.a;
#endif

#endif
    //ret.accum.r *= 20;

    return ret;
    }
#endif
