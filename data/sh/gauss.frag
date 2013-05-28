#ifdef opengl

uniform vec2 blurCoord;
uniform sampler2D texture;

varying vec2 tc;

void main() {
  vec2 c = tc;
  vec4 sum  = vec4(0.0);
  vec4 base = texture2D(texture, c);

  sum += texture2D(texture, c - 4.0*blurCoord ) * 0.05;
  sum += texture2D(texture, c - 3.0*blurCoord ) * 0.09;
  sum += texture2D(texture, c - 2.0*blurCoord ) * 0.13;
  sum += texture2D(texture, c -     blurCoord ) * 0.15;
  sum += base * 0.165;
  sum += texture2D(texture, c +     blurCoord ) * 0.15;
  sum += texture2D(texture, c + 2.0*blurCoord ) * 0.13;
  sum += texture2D(texture, c + 3.0*blurCoord ) * 0.09;
  sum += texture2D(texture, c + 4.0*blurCoord ) * 0.05;

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