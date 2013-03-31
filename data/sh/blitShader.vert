#ifdef opengl
attribute vec2 Position;
attribute vec2 TexCoord;

varying vec2 tc;

uniform vec2 dTexCoord;

void main() {
  tc = vec2(TexCoord.x, TexCoord.y);
  gl_Position = vec4( Position.x, -Position.y, 0.0,  1.0 );
  }

#else
struct VS_Input {
    float2 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    };

struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    };

FS_Input main( VS_Input IN,
               uniform float2 dTexCoord ) {
    FS_Input OUT;

    OUT.position  = float4(IN.position.x - dTexCoord.x,
                           IN.position.y + dTexCoord.y, 0.0, 1.0);
    OUT.texcoord0 = IN.texcoord0;

    return OUT;
    }
#endif
