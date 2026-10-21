# -*- coding: utf-8 -*-
import urllib.request
import json

url = 'http://localhost:8080/api/products'
headers = {'Content-Type': 'application/json'}

productos_completos = [
    # --- NOTEBOOKS Y TABLETS ---
    {
        'nombre': 'Tablet Galaxy Tab S6 Lite (2024) 64GB + Lápiz + Funda',
        'brand': 'Samsung',
        'descripcion': 'Pantalla de 10.4 pulgadas, incluye S-Pen original y funda protectora, ideal para estudio y productividad.',
        'precio': 279990,
        'stock': 15,
        'imageUrl': 'https://images.samsung.com/is/image/samsung/p6pim/cl/sm-p620nzaacho/gallery/cl-galaxy-tab-s6-lite-sm-p620-sm-p620nzaacho-thumb-540704445',
        'liberado': 'LIBERADO'
    },
    {
        'nombre': 'Apple iPad 10ma Generación 64GB Wi-Fi Plata',
        'brand': 'Apple',
        'descripcion': 'Pantalla Liquid Retina de 10.9 pulgadas, chip A14 Bionic, compatible con Magic Keyboard y Apple Pencil.',
        'precio': 389990,
        'stock': 10,
        'imageUrl': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-storage-select-202210-silver?wid=470&hei=556&fmt=png-alpha',
        'liberado': 'LIBERADO'
    },
    {
        'nombre': 'Notebook Gamer Lenovo Legion Pro 5i (16 pulgadas, RTX 4060)',
        'brand': 'Lenovo',
        'descripcion': 'Intel Core i7-14700HX, 16GB RAM DDR5, 1TB SSD NVMe, pantalla 240Hz WQXGA, tarjeta gráfica NVIDIA RTX 4060.',
        'precio': 1349990,
        'stock': 6,
        'imageUrl': 'https://p3-ofp.static.pub/fes/cms/2023/03/17/l3p5b8m147l4l2b9f648gxf3b9e4a3297126.png',
        'liberado': 'LIBERADO'
    },
    {
        'nombre': 'Notebook ASUS ZenBook 14 OLED Ultra Slim',
        'brand': 'ASUS',
        'descripcion': 'Intel Core Ultra 7, 16GB RAM, 512GB SSD, pantalla táctil 2.8K OLED de 120Hz, chasis de aluminio militar.',
        'precio': 999990,
        'stock': 8,
        'imageUrl': 'https://dlcdnwebimgs.asus.com/gain/9B9ED62A-5BD7-400A-AE55-9B055CC4E2C7/w717/h525',
        'liberado': 'LIBERADO'
    },

    # --- PANTALLAS Y MONITORES ---
    {
        'nombre': 'Monitor Gamer Samsung Odyssey G5 27 Pulgadas Curvo 165Hz',
        'brand': 'Samsung',
        'descripcion': 'Resolución WQHD (2560x1440), curvatura 1000R, 1ms de tiempo de respuesta, HDR10 y FreeSync Premium.',
        'precio': 249990,
        'stock': 12,
        'imageUrl': 'https://images.samsung.com/is/image/samsung/p6pim/cl/lc27g55tqwlxzs/gallery/cl-odyssey-g5-27g55t-lc27g55tqwlxzs-thumb-330536768',
        'liberado': 'LIBERADO'
    },
    {
        'nombre': 'Monitor Profesional LG UltraFine 32 Pulgadas 4K UHD',
        'brand': 'LG',
        'descripcion': 'Panel IPS 4K (3840x2160), 95% DCI-P3, HDR10, soporte ergonómico ajustable y altavoces estéreo Waves MaxxAudio.',
        'precio': 329990,
        'stock': 7,
        'imageUrl': 'https://www.lg.com/cl/images/monitores/md07548982/gallery/medium01.jpg',
        'liberado': 'LIBERADO'
    },

    # --- MOUSE Y ACCESORIOS DE COMPUTACIÓN ---
    {
        'nombre': 'Mouse Gamer Inalámbrico Logitech G Pro X Superlight 2',
        'brand': 'Logitech',
        'descripcion': 'Sensor HERO 2 de 32.000 DPI, interruptores ópticos híbridos LIGHTFORCE, peso ultraligero de 60 gramos.',
        'precio': 129990,
        'stock': 25,
        'imageUrl': 'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight-2/gallery/pro-x-superlight-2-magenta-gallery-1.png',
        'liberado': 'LIBERADO'
    },
    {
        'nombre': 'Mouse Ergonómico Inalámbrico Logitech MX Master 3S',
        'brand': 'Logitech',
        'descripcion': 'Sensor Darkfield 8000 DPI para cualquier superficie incluso vidrio, clics silenciosos y rueda MagSpeed electromagnética.',
        'precio': 99990,
        'stock': 30,
        'imageUrl': 'https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png',
        'liberado': 'LIBERADO'
    },

    # --- AUDÍFONOS Y WEARABLES ---
    {
        'nombre': 'Apple AirPods 4 con Cancelación Activa de Ruido',
        'brand': 'Apple',
        'descripcion': 'Chip H2, audio espacial personalizado con seguimiento dinámico de la cabeza y estuche de carga USB-C con altavoz.',
        'precio': 179990,
        'stock': 20,
        'imageUrl': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-anc-select-202409?wid=470&hei=556&fmt=png-alpha',
        'liberado': 'LIBERADO'
    },
    {
        'nombre': 'Apple AirTag (Pack de 1 Unidad)',
        'brand': 'Apple',
        'descripcion': 'Localizador inteligente para llaves y bolsos con tecnología Ultra Wideband (UWB) y red mundial Encontrar de Apple.',
        'precio': 34990,
        'stock': 40,
        'imageUrl': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-single-select-202104?wid=470&hei=556&fmt=png-alpha',
        'liberado': 'LIBERADO'
    },
    {
        'nombre': 'Audífonos Bluetooth Philips Over-Ear TAH1205BK',
        'brand': 'Philips',
        'descripcion': 'Batería de hasta 15 horas de reproducción, diseño plegable compacto, micrófono integrado para llamadas nítidas.',
        'precio': 29990,
        'stock': 35,
        'imageUrl': 'https://images.philips.com/is/image/PhilipsConsumer/TAH1205BK_00-IMS-es_CL?$jpglarge$&wid=960',
        'liberado': 'LIBERADO'
    },
    {
        'nombre': 'Smartwatch Xiaomi Redmi Watch 5 Active Negro',
        'brand': 'Xiaomi',
        'descripcion': 'Pantalla de 2.0 pulgadas LCD, llamadas Bluetooth con cancelación de ruido de 2 micrófonos, hasta 18 días de batería.',
        'precio': 39990,
        'stock': 30,
        'imageUrl': 'https://i02.appmifile.com/56_operator_sg/27/08/2024/7d4e5f72007f3607fc7eec65471923ff.png',
        'liberado': 'LIBERADO'
    },
    {
        'nombre': 'Smartband Xiaomi Band 9 Active Negro',
        'brand': 'Xiaomi',
        'descripcion': 'Pantalla TFT de 1.47 pulgadas ultra delgada de 9.99 mm, más de 50 modos deportivos y resistencia al agua 5 ATM.',
        'precio': 24990,
        'stock': 50,
        'imageUrl': 'https://i02.appmifile.com/129_operator_sg/14/08/2024/dc71c0800e84b7f8df2d3e230756778f.png',
        'liberado': 'LIBERADO'
    },
    {
        'nombre': 'Batería Externa Power Bank Xiaomi 10.000 mAh Redmi 22.5W',
        'brand': 'Xiaomi',
        'descripcion': 'Carga rápida bidireccional USB-C de 22.5W, doble puerto de salida USB-A, diseño compacto y protección multicapa.',
        'precio': 19990,
        'stock': 45,
        'imageUrl': 'https://i02.appmifile.com/393_operator_sg/29/08/2023/118ce5c737cb2caeb0be7fcf7ffec07a.png',
        'liberado': 'LIBERADO'
    },

    # --- SMARTPHONES EXTRA (MOTOROLA Y HONOR) ---
    {
        'nombre': 'Motorola Moto G85 5G (256GB / 8GB RAM) Azul Cobalto',
        'brand': 'Motorola',
        'descripcion': 'Pantalla curva pOLED de 6.67 pulgadas 120Hz, cámara de 50MP Sony LYTIA 600 con OIS y sonido estéreo Dolby Atmos.',
        'precio': 269990,
        'stock': 18,
        'imageUrl': 'https://motorola.vtexassets.com/arquivos/ids/158656-800-auto?v=638562777174670000',
        'liberado': 'LIBERADO'
    },
    {
        'nombre': 'Honor Magic 6 Lite 5G (256GB) Verde Esmeralda',
        'brand': 'Honor',
        'descripcion': 'Pantalla ultra resistente anticaídas Ultra-Bounce de 1.5K, batería masiva de 5800 mAh y cámara principal de 108MP.',
        'precio': 289990,
        'stock': 14,
        'imageUrl': 'https://www.hihonor.com/content/dam/honor/cl/product-list/smartphones/honor-magic6-lite/honor-magic6-lite-green.png',
        'liberado': 'LIBERADO'
    }
]

exitosos = 0
for p in productos_completos:
    req = urllib.request.Request(url, data=json.dumps(p).encode('utf-8'), headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req) as resp:
            exitosos += 1
            print(f"[{exitosos}/{len(productos_completos)}] Creado: {p['nombre']}")
    except Exception as e:
        print(f"Error en: {p['nombre']} -> {e}")

print(f"\nTotal de productos nuevos insertados en MySQL: {exitosos}")
