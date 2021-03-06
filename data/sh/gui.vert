#ifdef opengl
#ifndef oes_render
#define lowp
#endif

attribute vec2 Position;
attribute vec2 TexCoord;
attribute vec4 TexCoord1;

varying lowp vec4 cl;
varying lowp vec2 tc;

void main() {
  cl = TexCoord1;
  tc = TexCoord;

  gl_Position = vec4( Position.x, Position.y, 0.0, 1.0 );
  }

#else
struct VS_Input {
    float2 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    float4 color     : TEXCOORD1;
    };

struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    float4 color     : TEXCOORD1;
    };

FS_Input main( VS_Input IN,
               uniform float2 dxScreenOffset ) {
    FS_Input OUT;

    float2 c = IN.position.xy;

    OUT.position  = float4( c.x - 1*dxScreenOffset.x,
                            c.y + 1*dxScreenOffset.y, 0.0, 1.0);
    OUT.texcoord0 = IN.texcoord0;// + float2( dxScreenOffset.x, 0);
    OUT.color     = IN.color;

    return OUT;
    }
#endif
