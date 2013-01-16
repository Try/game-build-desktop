struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    };

struct FS_Output {
    float4 final : COLOR0;
    };

FS_Output main( FS_Input input,
                uniform sampler2DRect texture ) {
    FS_Output ret;

    ret.final = texRECT( texture, input.texcoord0 );

    float lum = 0.2126*ret.final.r + 0.7152*ret.final.g + 0.0722*ret.final.b;

    if( lum < 0.6 ){
      lum = 0.6*pow(lum/0.6, 4);
      ret.final *= lum;
      //ret.final = float4(0,0,0,1);
      }

    return ret;
    }
