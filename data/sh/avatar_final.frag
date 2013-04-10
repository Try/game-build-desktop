#ifdef opengl
uniform sampler2D scene;
#if settings_glow
uniform sampler2D glow;
#endif

varying vec2 tc;

void main() {
  vec2 c = tc;
  c.y = 1.0-c.y;
  gl_FragColor = texture2D( scene, c ) 
#if settings_glow
                 +texture2D( glow,  c )*5.0
#endif
                 ;
  }
#else
struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    };

struct FS_Output {
    float4 color    : COLOR0;
    };


FS_Output main( FS_Input input,
                uniform sampler2D scene
#if settings_glow
                ,uniform sampler2D glow
#endif
                ) {
    FS_Output ret;

    float4 color = tex2D( scene, input.texcoord0 ) 
#if settings_glow
	                +tex2D( glow,  input.texcoord0 )*5.0
#endif
    ;

    ret.color = color;

    return ret;
    }
#endif
