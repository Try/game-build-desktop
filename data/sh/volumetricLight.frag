#ifdef opengl

#else
struct FS_Input {
  float4 position  : POSITION;
  float2 texcoord0 : TEXCOORD0;
  };

struct FS_Output {
  float4 color    : COLOR0;
  };

FS_Output main( FS_Input input,
                uniform float4x4 invMatrix,
                uniform float4x4 shMatrix,
                uniform sampler2DRect mainDepth,
                uniform sampler2D shadowMap
                ) {
    FS_Output ret;
    float val = 1.0;

    float2 tc0 = input.texcoord0;
    float  z0  = texRECT( mainDepth, tc0 ).r;

    float3 position0 = float3( tc0*2 - 1, 0 );
    position0.y = -position0.y;
    position0.z = 0;

    float4 tmpP = mul( invMatrix, float4(position0, 1) );
    float3 oldPos = tmpP.xyz/tmpP.w;

    float v1 = 0, v2;
    for( int i=0; i<50; ++i ){
      float a = i/49.0;

      a = mix(a, 1.f, 0.8);
      a = 1 - pow( (1-a), 2);


      float3 position1 = position0;
      position1.z = z0*a;

      float4 tmpP = mul( invMatrix, float4(position1, 1) );
      float3 position = tmpP.xyz/tmpP.w;

      float4 shPosition = mul( shMatrix, float4(position,1) );
      shPosition /= shPosition.w;

      float2 shTc = shPosition.xy;
      float2 dValVec = (float2(1)-abs(shTc))*1000;
      float dVal = clamp( min(dValVec.x, dValVec.y), 0, 1);

      shTc += float2(1,1);
      shTc *= 0.5;
      shTc.y  = 1-shTc.y;

      float l = length(position - oldPos);
      l = min(l, 0.1);
      oldPos = position;

      float d = -50*(tex2D(shadowMap, shTc.xy).r - shPosition.z);
      v1 += clamp(  d, 0, 1 )*l*dVal;
      v2 += l;
      }

    //v /= 9.0;
    float v = 1 - min(v1, 1);

    float3 color = float3(0.7,0.8,1);

    ret.color = float4( color*v, (z0 - 0.5)*0.5 );

    return ret;
    }
#endif
