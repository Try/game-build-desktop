struct FS_Input {
  float4 position  : POSITION;
  float2 texcoord0 : TEXCOORD0;
  };

struct FS_Output {
  float4 color    : COLOR0;
  };

float inv( float x ){
  return 1-11*x;
  }

FS_Output main( FS_Input input,
                uniform sampler2DRect texture,
                uniform sampler2DRect dBuf,
                uniform float scaleSize,
                //uniform float dangle,
                uniform float4x4 invMatrix,
                uniform float4x4 shMatrix
                ) {
    FS_Output ret;

    float2 tc = input.texcoord0;
    float4 coord;
    coord.xy = tc*2 - 1;
    coord.y *= -1;
    coord.z  = texRECT(dBuf, tc).r;
    coord.w  = 1;

    float4 pos = mul( invMatrix, coord );
    pos/=pos.w;

    float4 shPos = mul( shMatrix, pos );
    shPos/=shPos.w;

    shPos.y *= -1;
    shPos.xy += float2(1);
    shPos.xy /= 2.0;

    float z = shPos.z;//texRECT(texture, shPos.xy).r;
    float aoVal = 0;//clamp(z - texRECT(texture, shPos.xy).r, 0, 1);

    float4 ao  = texRECT(texture, shPos.xy);
    float4 tex = texRECTlod( texture, float4(shPos.xy, 0, 0) );

    aoVal += inv( clamp( (z-0.015 - tex.r)*1.5, 0, 1) ) *
             inv( clamp( (z-0.04  - tex.g)*1.5, 0, 1) ) *
             inv( clamp( (z-0.05  - tex.b)*1.5, 0, 1) );
    //aoVal = 1 - 11*aoVal;

    float2 mulT = shPos.xy*2 - 1;
    float mul = max( abs(mulT.x), abs(mulT.y) );
    mul = 1.0 - max(mul-0.9, 0)/0.1;

    aoVal = mix(1, aoVal, mul);
    ret.color = float4( float3(aoVal),1);
    return ret;
    }
