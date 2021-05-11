<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProductImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fruit = file_get_contents('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ROuTWjCaKyydBwhVKUPMAQHaE8%26pid%3DApi&f=1');
        Storage::disk('public')->put('/images/products/FRFA05W000001.png', $fruit);

        $fruit = file_get_contents('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.AEigkPiSwvTzdKuc4CTPOgHaEK%26pid%3DApi&f=1');
        Storage::disk('public')->put('/images/products/FRMO05W000002.png', $fruit);

        $fruit = file_get_contents('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.YkA8D3KBeIqA_7xuOIy7JQHaEv%26pid%3DApi&f=1');
        Storage::disk('public')->put('/images/products/FRD007A000003.png', $fruit);

        $fruit = file_get_contents('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP._S8wkxkjJWReFqJgFKTQxAHaEO%26pid%3DApi&f=1');
        Storage::disk('public')->put('/images/products/FRMA07E000004.png', $fruit);

        $fruit = file_get_contents('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.V_uJSMtdGu9sT_6b_w6z2AHaEK%26pid%3DApi&f=1');
        Storage::disk('public')->put('/images/products/FRAE08S000005.png', $fruit);

        $fruit = file_get_contents('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.C-AuML8CHBYNOLAZ0rImowHaFj%26pid%3DApi&f=1');
        Storage::disk('public')->put('/images/products/VECA07V000006.png', $fruit);

        $fruit = file_get_contents('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Hi0Bv99UDI16uHeYzzEoAwHaE3%26pid%3DApi&f=1');
        Storage::disk('public')->put('/images/products/VEJE08P000007.png', $fruit);
    }
}
