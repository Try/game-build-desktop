struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    };

struct FS_Output {
    float4 accum    : COLOR0;
    };

FS_Output main( FS_Input input,
                uniform sampler2D texture ) {
    FS_Output ret;

    float4 diffuse = tex2D( texture, input.texcoord0 );

    ret.accum = diffuse;
    return ret;
    }
