struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    };

struct FS_Output {
    float4 final : COLOR0;
    };

FS_Output main( FS_Input input,
                uniform sampler2DRect scene,
                uniform sampler2DRect bloom,
                uniform sampler2DRect  glow,
                uniform float2 dTexCoord ) {
    FS_Output ret;

    float2 c = input.texcoord0;

    ret.final = texRECT( scene, c ) +
                texRECT( bloom, c )*0.5 +
                texRECT( glow,  c )*5.0;

    return ret;
    }
