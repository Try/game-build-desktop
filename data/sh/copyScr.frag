struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    };

struct FS_Output {
    float4 final : COLOR0;
    };

FS_Output main( FS_Input input,
                uniform sampler2DRect texture,
                uniform sampler2DRect depth    ) {
    FS_Output ret;

    float a = texRECT( depth, input.texcoord0 );
    ret.final = texRECT( depth, input.texcoord0 );//float4(a,a,a,1);
    return ret;
    }
