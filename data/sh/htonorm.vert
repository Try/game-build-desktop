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

