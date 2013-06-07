#ifdef opengl

uniform sampler2D texture;

varying vec2 tc[8];

void main() {
  vec4 sum  = vec4(0.0);
  vec2 tcCen = (tc[3]+tc[4])*0.5;
  vec4 base = texture2D(texture, tcCen );

  sum += texture2D(texture, tc[0] ) * 0.05;
  sum += texture2D(texture, tc[1] ) * 0.09;
  sum += texture2D(texture, tc[2] ) * 0.13;
  sum += texture2D(texture, tc[3] ) * 0.15;
  sum += base * 0.165;
  sum += texture2D(texture, tc[4] ) * 0.15;
  sum += texture2D(texture, tc[5] ) * 0.13;
  sum += texture2D(texture, tc[6] ) * 0.09;
  sum += texture2D(texture, tc[7] ) * 0.05;

  sum. NON_COMOPUTE_MACRO;
  gl_FragColor = sum;
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
                uniform sampler2DRect texture,
                uniform float2 blurCoord ) {
    FS_Output ret;

    float2 c = input.texcoord0;
    float4 sum = float4(0.0);
    float4 base = texRECT(texture, c);

    sum += texRECT(texture, c - 4.0*blurCoord ) * 0.05;
    sum += texRECT(texture, c - 3.0*blurCoord ) * 0.09;
    sum += texRECT(texture, c - 2.0*blurCoord ) * 0.13;
    sum += texRECT(texture, c -     blurCoord ) * 0.15;
    sum += base * 0.16;
    sum += texRECT(texture, c +     blurCoord ) * 0.15;
    sum += texRECT(texture, c + 2.0*blurCoord ) * 0.13;
    sum += texRECT(texture, c + 3.0*blurCoord ) * 0.09;
    sum += texRECT(texture, c + 4.0*blurCoord ) * 0.05;

    ret.final = sum;
    ret.final. NON_COMOPUTE_MACRO;

    return ret;
    }
#endif