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

    float4 f0 = texRECT( texture, input.texcoord0 ),
           f1 = texRECT( texture, input.texcoord0 + float2(dTexCoord.x, 0) ),
           f2 = texRECT( texture, input.texcoord0 + float2(0, dTexCoord.y) ),
           f3 = texRECT( texture, input.texcoord0 + dTexCoord );

    ret.final =(f1+f2+f3+f0) * 0.25;
    //ret.final = max( max(f0,f1), max(f2,f3) );

    return ret;
    }
