#ifdef opengl

#else
struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    };

struct FS_Output {
    float4 final : COLOR0;
    };

FS_Output main( FS_Input input,
                uniform sampler2DRect scene,
                uniform sampler2DRect diff,
                uniform sampler2DRect depth,

                uniform sampler2DRect ssao,
                uniform sampler2DRect ssaoN,
                uniform sampler2DRect ssaoD,

                uniform float4x4      invMatrix,
                uniform float4x4      shMatrix,
                uniform float4x4      invShMatrix,
                uniform float3 lightAblimient ) {
    FS_Output ret;

    float2 c = input.texcoord0;

    //float ao = 1.0-texRECT( ssao,  c ).r;//max( 1.0-texRECT( ssao,  c ).r*4, 0 );

    ret.final = texRECT( scene, c ) -
                1*texRECT( diff,  c )*float4(lightAblimient, 0.0);

    float4 coord;
    coord.xy = c*2 - 1;
    coord.y *= -1;
    coord.z  = texRECT(depth, c).r;
    coord.w  = 1;

    float4 pos = mul( invMatrix, coord );
    pos/=pos.w;

    float4 shPos = mul( shMatrix, pos );
    shPos/=shPos.w;

    shPos.y *= -1;
    shPos.xy += float2(1);
    shPos.xy /= 2.0;
    shPos.y = 1 - shPos.y;

    float4 color = float4(0);

    for( int i=0; i<5; ++i )
      for( int r=0; r<5; ++r ){
        float2 dTc = 8*float2(i-2, r-2)/512.0+shPos.xy;
       // float2 dTc = shPos.xy;

        float4 coords;
        coords.xy = dTc*2 - 1;
        coords.y *= -1;
        coords.z  = texRECT(ssaoD, dTc).r;
        coords.w  = 1;

        float4 spos = mul( invShMatrix, coords );
        spos/=spos.w;

        float3 vVec = -( (pos-spos).xyz );
        //float len = length(vVec);

        float3 nRSM = texRECT( ssaoN,  dTc )*2 - float3(1);

        float dV = clamp( 1-dot(vVec.xyz, nRSM), 0, 1 );

        color += dV*texRECT( ssao, dTc );
        }

    ret.final += texRECT( diff,  c )*color/25.0;
    return ret;
    }
#endif
