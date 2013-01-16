struct FS_Input {
  float4 position  : POSITION;
  float2 texcoord0 : TEXCOORD0;
  };

struct FS_Output {
  float4 color    : COLOR0;
  };

FS_Output main( FS_Input input,
                uniform sampler2DRect texture,
                uniform sampler2DRect blured,
                uniform sampler2DRect macro
                ) {
    FS_Output ret;

    float3 t0 = texRECT( texture, input.texcoord0 ).rgb*2-1;
    float3 t1 = texRECT(  blured, input.texcoord0 ).rgb*2-1;

    float3 d = t1-t0;

    float v = length(t0-t1);//abs(d.x)+abs(d.y)+abs(d.z);//max( length(t0-t1), 0.0 );

    v = (v-0.2)/0.8;

    //v = pow(v,4);
    v = 1.0-v;

    float mac = texRECT( macro, input.texcoord0 ).r;

    v = mac*v;//max(v, mac);
    v = pow(v, 2);

    ret.color = float4( v, v, v, 1 );
    ///ret.color = float4( t0-t1, 1 );
    return ret;
    }
