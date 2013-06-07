#ifdef opengl
#ifndef oes_render
#define lowp
#endif

attribute lowp vec2 Position;
attribute lowp vec2 TexCoord;

varying vec2 tc[8];

uniform vec2 blurCoord;
uniform vec2 dTexCoord;

void main() {
  vec2 c = vec2(TexCoord.x, 1.0-TexCoord.y);
  
  tc[0] = c - 4.0*blurCoord; 
  tc[1] = c - 3.0*blurCoord; 
  tc[2] = c - 2.0*blurCoord; 
  tc[3] = c -     blurCoord; 
  //tc[4] = c; 
  tc[4] = c +     blurCoord;
  tc[5] = c + 2.0*blurCoord; 
  tc[6] = c + 3.0*blurCoord;
  tc[7] = c + 4.0*blurCoord; 
  
  gl_Position = vec4( Position.x, Position.y, 0.0,  1.0 );
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

    OUT.position  = float4( IN.position.x - 1*dTexCoord.x,
                            IN.position.y + 1*dTexCoord.y, 0.0, 1.0);
    OUT.texcoord0 = IN.texcoord0;

    return OUT;
    }
#endif