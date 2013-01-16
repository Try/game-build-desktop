struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    };

struct FS_Output {
    float4 color    : COLOR0;
    };


FS_Output main( FS_Input input,
                uniform sampler2D scene,
                uniform sampler2D glow ) {
    FS_Output ret;

    float4 color = tex2D( scene, input.texcoord0 ) +
	               tex2D( glow,  input.texcoord0 )*5.0;

    ret.color = color;

    return ret;
    }
