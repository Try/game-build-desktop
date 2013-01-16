struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    };

struct FS_Output {
    float4 final : COLOR0;
    };

FS_Output main( FS_Input input,
                uniform sampler2DRect texture ) {
    FS_Output ret;

    ret.final = texRECT( texture, input.texcoord0 );
    return ret;
    }
