#ifdef opengl
varying vec2 tc;

uniform sampler2D texture;

void main() {
  gl_FragColor = texture2D(texture, tc);
  }
  
#else
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
#endif