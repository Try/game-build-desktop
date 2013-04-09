#ifdef opengl
varying vec2 tc;

uniform sampler2D scene;
uniform sampler2D fog;

void main() {
  //tc = 
  gl_FragColor = texture2D(scene, tc)*texture2D(fog, tc);
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
                uniform sampler2DRect scene,
                uniform sampler2DRect   fog,
                uniform float2 dTexCoord ) {
    FS_Output ret;

    float2 c = input.texcoord0;

    ret.final = texRECT( scene, c )*texRECT( fog, c );

    return ret;
    }
#endif