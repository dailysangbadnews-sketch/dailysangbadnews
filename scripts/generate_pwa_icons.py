import zlib
import struct
import math

def create_png(width, height, is_maskable=False):
    # RGBA image buffer
    raw_data = bytearray()
    
    # Palette colors
    bg_color = (24, 35, 48, 255)       # #182330
    dark_bg = (17, 26, 36, 255)        # #111a24
    red_primary = (197, 44, 57, 255)   # #c52c39
    red_dark = (125, 16, 26, 255)      # #7d101a
    white = (255, 255, 255, 255)
    light_pink = (254, 202, 202, 255)

    cx, cy = width / 2.0, height / 2.0
    outer_radius = width * (0.42 if not is_maskable else 0.48)
    card_radius = width * 0.30

    for y in range(height):
        raw_data.append(0)  # filter type 0 (None)
        for x in range(width):
            dx = x - cx
            dy = y - cy
            dist = math.sqrt(dx * dx + dy * dy)
            
            # Corner / base background
            if is_maskable:
                r, g, b, a = dark_bg
            else:
                if dist <= outer_radius:
                    factor = (y / height)
                    r = int(bg_color[0] * (1 - factor) + dark_bg[0] * factor)
                    g = int(bg_color[1] * (1 - factor) + dark_bg[1] * factor)
                    b = int(bg_color[2] * (1 - factor) + dark_bg[2] * factor)
                    a = 255
                else:
                    r, g, b, a = 0, 0, 0, 0
            
            # Inner Emblem card (rounded square approximation)
            nx = abs(dx) / (card_radius * 1.1)
            ny = abs(dy) / (card_radius * 1.1)
            # Squircle equation: x^4 + y^4 < 1
            if (nx**4 + ny**4) < 1.0:
                factor = (y / height)
                r = int(red_primary[0] * (1 - factor) + red_dark[0] * factor)
                g = int(red_primary[1] * (1 - factor) + red_dark[1] * factor)
                b = int(red_primary[2] * (1 - factor) + red_dark[2] * factor)
                a = 255
                
                # Central news studio symbol / crossbars
                # Vertical spine
                if abs(dx) < (width * 0.05) and abs(dy) < (height * 0.16):
                    r, g, b, a = white
                # Top horizontal bar
                if abs(dx) < (width * 0.13) and abs(dy + height * 0.12) < (height * 0.035):
                    r, g, b, a = white
                # Mid horizontal bar
                if abs(dx) < (width * 0.10) and abs(dy - height * 0.01) < (height * 0.032):
                    r, g, b, a = white
                # Bottom accent dot / flash
                if abs(dx - width * 0.08) < (width * 0.035) and abs(dy - height * 0.11) < (height * 0.035):
                    r, g, b, a = light_pink

            raw_data.extend([r, g, b, a])

    def png_chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    header = b'\x89PNG\r\n\x1a\n'
    ihdr = png_chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0))
    idat = png_chunk(b'IDAT', zlib.compress(bytes(raw_data), 9))
    iend = png_chunk(b'IEND', b'')

    return header + ihdr + idat + iend

if __name__ == '__main__':
    with open('public/pwa-192x192.png', 'wb') as f:
        f.write(create_png(192, 192, False))
    print('Generated 192x192')

    with open('public/pwa-512x512.png', 'wb') as f:
        f.write(create_png(512, 512, False))
    print('Generated 512x512')

    with open('public/pwa-maskable-512x512.png', 'wb') as f:
        f.write(create_png(512, 512, True))
    print('Generated maskable 512x512')

    with open('public/apple-touch-icon.png', 'wb') as f:
        f.write(create_png(180, 180, False))
    print('Generated apple-touch-icon 180x180')
