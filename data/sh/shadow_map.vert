#ifdef opengl
#ifndef oes_render
#define lowp
#endif

attribute lowp vec4 Position;
attribute lowp vec4 Normal;

#if settings_shadowTextures
varying lowp vec2 tc;
#endif
varying lowp float zval;

uniform mat4 mvpMatrix;

void main() {
#if settings_shadowTextures
  tc = vec2(Position.w, Normal.z);
#endif

  vec4 p = mvpMatrix*vec4( Position.xyz, 1.0 );
  zval = p.z/p.w;
  
  gl_Position = vec4(p.x, p.y, p.z, p.w); 
  }
#else
struct VS_Input {
    float4 position  : POSITION;
    //float2 texcoord0 : TEXCOORD0;
    float4 normal    : NORMAL;
    };

struct FS_Input {
    float4 position  : POSITION;
    float4 pos       : TEXCOORD0;
    float2 texcoord0 : TEXCOORD1;
    };

FS_Input main( VS_Input IN,
               uniform float4x4 mvpMatrix ) {
    FS_Input OUT;

    float4 v = float4( IN.position.x,
                       IN.position.y,
                       IN.position.z,
                       1.0 );

    v = mul( mvpMatrix, v );

    OUT.position    = v;
    OUT.pos         = v;
    OUT.texcoord0   = float2(IN.position.w, IN.normal.z);//IN.texcoord0;

    return OUT;
    }
#endif