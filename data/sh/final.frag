#ifdef opengl

uniform sampler2D scene;
#if settings_bloom
uniform sampler2D bloom;
#endif
#if settings_glow
uniform sampler2D glow;
#endif

varying vec2 tc;

void main() {
  vec2 c = tc;
  gl_FragColor = texture2D( scene, c ) 
#if settings_bloom
                 +texture2D( bloom, c )*0.5 
#endif
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
    float4 final : COLOR0;
    };

FS_Output main( FS_Input input
                ,uniform sampler2DRect scene
                #if settings_bloom
                ,uniform sampler2DRect bloom
                #endif
                #if settings_glow
                ,uniform sampler2DRect  glow 
                #endif 
                ) {
    FS_Output ret;

    float2 c = input.texcoord0;

    ret.final = texRECT( scene, c ) 
                #if settings_bloom
                + texRECT( bloom, c )*0.5 
                #endif
                #if settings_glow
                + texRECT( glow,  c )*5.0
                #endif
                ;
    //ret.final = float4(1.0);

    /*
    const float exposure = 21;
    float3 texColor = ret.final.rgb;

    float3 retColor = float3( 1.0 ) - exp( -exposure * texColor.rgb );
    ret.final = float4(retColor,1);
    */

    return ret;
    }
#endif