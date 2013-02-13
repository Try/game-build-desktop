struct VS_Input {
    float3 position  : POSITION;
    float2 texcoord0 : TEXCOORD0;
    float3 normal    : NORMAL;
    };

struct FS_Input {
  float4 position  : POSITION;
  float2 texcoord0 : TEXCOORD0;
  float3 cenPos    : TEXCOORD1;

  float3 pos       : TEXCOORD2;
  float3 lpos      : TEXCOORD3;
  };

FS_Input main( VS_Input IN,
               uniform float4x4 mvpMatrix,
               uniform float3   cenPos
               ) {
    FS_Input OUT;
    float3 disp = float3(0,0,0.25);
    float4 sc = mul( mvpMatrix, float4(IN.position+disp, 1) );
    sc /= sc.w;
    //sc.z = min(sc.z, 1.0);

    OUT.position   = sc;
    //OUT.position.z = 0.1;//max(sc.z, 0.1);
    OUT.position.w = 1;

    OUT.pos      = OUT.position.xyz;
    OUT.lpos     = float3(-disp);//mul( mvpMatrix, float4(0,0,0, 1) );

    float2 tc = (sc.xy + float2(1.0))*0.5;
    tc.y = 1.0-tc.y;
    OUT.texcoord0  = tc;
/*
    float4 cpos = mul( mvpMatrix, float4(cenPos, 1) );
    tc = (cpos.xy/cpos.w+float2(1.0))*0.5;
    tc.y = 1.0-tc.y;
    OUT.cenPos = tc;*/

    float4 cpos = mul( mvpMatrix, float4(cenPos, 1) );
    cpos /= cpos.w;
    OUT.cenPos = cpos.xyz;

    return OUT;
    }
