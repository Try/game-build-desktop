#ifdef opengl
#ifndef oes_render
#define lowp
#endif

#if settings_shadowTextures
varying lowp vec2 tc;
#endif
varying lowp float zval;

#if settings_shadowTextures
uniform sampler2D texture;
#endif

void main() {  
#if settings_shadowTextures
#ifndef teamColor
  if( texture2D(texture, tc).a<0.5 )
    discard;
#else
  if( texture2D(texture, tc).a<=0.0 )
    discard;
#endif
#endif

  gl_FragColor = vec4(zval, zval, zval, 1.0);
  }
#else
struct FS_Input {
    float4 position  : POSITION;
    float4 pos       : TEXCOORD0;
    float2 texcoord0 : TEXCOORD1;
    };

struct FS_Output {
    float4 z    : COLOR0;
    };

FS_Output main( FS_Input input,
                uniform sampler2D texture ) {
    FS_Output ret;

    ret.z = input.pos.z;
    ret.z.a = tex2D( texture, input.texcoord0 ).a;

    return ret;
    }
#endif