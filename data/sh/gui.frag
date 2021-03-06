#ifdef opengl
#ifndef oes_render
#define lowp
#endif

varying lowp vec4 cl;
varying lowp vec2 tc;

uniform sampler2D texture;

void main() {
  gl_FragColor = texture2D(texture, tc)*cl;
  }
  
#else
struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    float4 color     : TEXCOORD1;
    };

struct FS_Output {
    float4 final : COLOR0;
    };

FS_Output main( FS_Input input,
                uniform sampler2DRect texture ) {
    FS_Output ret;

    ret.final = texRECTlod( texture, float4(input.texcoord0, 0, 0) )
                *input.color;

    return ret;
    }
#endif
