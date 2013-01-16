struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    };

struct FS_Output {
    float4 final : COLOR0;
    };

FS_Output main( FS_Input input,
                uniform sampler2DRect b0,
                uniform sampler2DRect b1,
                uniform sampler2DRect b2 ) {
    FS_Output ret;

    ret.final = (texRECT( b0, input.texcoord0 )*2 +
                 texRECT( b1, input.texcoord0 )*1 +
                 texRECT( b2, input.texcoord0 )*1)/4.0;
    return ret;
    }
