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
                uniform sampler2DRect ssao,
                uniform float3 lightAblimient ) {
    FS_Output ret;

    float2 c = input.texcoord0;

    float ao = 1.0-texRECT( ssao,  c ).r;//max( 1.0-texRECT( ssao,  c ).r*4, 0 );

    ret.final = texRECT( scene, c ) -
                ao*texRECT( diff,  c )*float4(lightAblimient, 0.0);


    //float3 cl = 1.0-ao;//*texRECT( diff,  c ).rgb*0.3;//*lightAblimient;
    //ret.final = float4( cl, 1.0);

    return ret;
    }
