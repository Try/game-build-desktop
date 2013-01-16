struct VS_Input {
    float3 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    float3 normal    : NORMAL;
    };

struct FS_Input {
    float4 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    };

FS_Input main( VS_Input IN,
               uniform float4x4 mvpMatrix ) {
    FS_Input OUT;

    float4 v = float4( IN.position.x,
                       IN.position.y,
                       IN.position.z,
                       1.0f );

    OUT.position   = mul( mvpMatrix,    v );
    OUT.texcoord0  = IN.texcoord0;

    return OUT;
    }
