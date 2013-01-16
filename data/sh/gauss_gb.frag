struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    };

struct FS_Output {
    float4 final : COLOR0;
    };

FS_Output main( FS_Input input,
                uniform sampler2DRect texture,
                uniform float2 dTexCoord ) {
    FS_Output ret;

    float2 c = input.texcoord0;
    float4 sum = float4(0.0);

    float4 base = texRECT(texture, c);

    sum += texRECT(texture, c - 4.0*dTexCoord ) * 0.05;
    sum += texRECT(texture, c - 3.0*dTexCoord ) * 0.09;
    sum += texRECT(texture, c - 2.0*dTexCoord ) * 0.12;
    sum += texRECT(texture, c -     dTexCoord ) * 0.15;
    sum += base * 0.16;
    sum += texRECT(texture, c +     dTexCoord ) * 0.15;
    sum += texRECT(texture, c + 2.0*dTexCoord ) * 0.12;
    sum += texRECT(texture, c + 3.0*dTexCoord ) * 0.09;
    sum += texRECT(texture, c + 4.0*dTexCoord ) * 0.05;

    ret.final = sum;
    NON_COMOPUTE_MACRO;

    return ret;
    }
