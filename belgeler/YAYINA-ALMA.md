# Haliç Aday: kaynak dosyalar ve yayın yönergesi

Bu paket, yeni Haliç aday ana sayfasının HTML, CSS, JavaScript, program verisi ve kullandığı tüm yerel varlıklarını içerir. `site/` klasörü hem düzenlenebilir kaynak hem de sunucuya yüklenecek hazır sitedir. Derleme, npm kurulumu, veritabanı veya API anahtarı gerektirmez.

## Paket yapısı

```text
halic-aday-yayin-paketi/
  site/
    index.html        Ana sayfa, metinler ve bağlantılar
    style.css         Görsel tasarım, fontlar ve mobil kurallar
    app.js            Arama, filtreler, pencereler ve hareketler
    programs.json     93 programın verisi
    assets/           Fotoğraflar, SVG logolar/simgeler, fontlar, video,
                      Kedu GIF/poster ve yerel Lenis dosyaları
  belgeler/           Yayın ve kaynak bilgileri
```

## Bilgisayarda açma

ZIP'i açın; terminalde paketin ana klasörüne geçin ve çalıştırın:

```sh
python3 -m http.server 4173 --directory site
```

Tarayıcıda `http://localhost:4173` adresini açın. Terminalde `Ctrl+C` ile sunucuyu kapatın. Dosyayı çift tıklayarak `file://` üzerinden açmak, `programs.json` isteğini engelleyebilir; HTTP üzerinden açılmalıdır.

## cPanel / Plesk / FTP ile yükleme

1. Mevcut sitenin dosya, veritabanı ve sunucu yapılandırma yedeğini alın.
2. Hedef alan adı için belge kökünü belirleyin. Bu klasör sunucuya göre `public_html`, `httpdocs` veya ayrı bir alt alan adı dizini olabilir.
3. **`site/` klasörünün içeriğini** bu hedefe yükleyin. Klasör yapısı hedefte `index.html`, `style.css`, `app.js`, `programs.json` ve `assets/` olacak şekilde korunmalıdır. `belgeler/` dosyalarını ziyaretçiye açık köke yüklemek gerekmez.
4. Alan adı kökü için yeni `index.html` dosyasını sunacak ana sayfa ayarını yapın. HTTPS sertifikasının çalıştığını doğrulayın.
5. Dosya adlarının büyük/küçük harfini ve `assets/` yollarını değiştirmeyin. Yükleme sonrası CDN/sunucu önbelleğini temizleyin ve sayfayı gizli pencerede açın.

## Mevcut aday.halic.edu.tr üzerine geçiş

**Bu bir ana sayfa paketidir. Mevcut WordPress'in, alt sayfaların veya veritabanının yerine geçmez.** Yeni tasarımın program ayrıntıları, resmî ücret tablosu, burs koşulları ve bilgi talep formu, mevcut resmî sayfalara bağlantı verir.

`aday.halic.edu.tr` kökü değiştirilecekse `/bolumler-programlar/`, `/kontenjan-puanlar-ucretler/`, `/kampus/`, `/iletisim/`, burs ve program alt sayfaları çalışır durumda kalmalıdır. WordPress'in `index.php`, `.htaccess`, `wp-admin`, `wp-content`, `wp-includes`, REST/API ve form servislerini silmeyin. Mevcut rewrite kurallarını tümden bir statik site kuralıyla değiştirmeyin.

Sunucu yöneticisi yalnızca `/` isteğini yeni ana sayfaya ve paketin statik dosya yollarını ilgili dosyalara yönlendirmeli; diğer yollar mevcut WordPress'e gitmelidir. Apache'de mevcut kökte `index.html` önceliğinin nasıl belirlendiği, Nginx'te mevcut tam eşleşme `/` konumu ayrıca kontrol edilir. Sunucunun mevcut yapılandırması görülmeden genel bir `.htaccess` veya Nginx dosyasını üzerine yazmak uygun değildir; pakette bu nedenle mevcut sistemi değiştiren otomatik sunucu kuralı bulunmaz.

Yeni bir alan adı/alt alan adında bağımsız statik yayın yapılırsa `site/` içeriği doğrudan belge kökü olarak kullanılabilir. Ayrıntı ve iletişim bağlantıları `aday.halic.edu.tr` adresinde kalır. Bir alt dizinde de yerel varlıklar göreli yollarla yüklenir; son adresi `/` ile bitirerek yayınlayın ve ana sayfayı HTTP üzerinden açın.

## Sunucu dosya türleri

Sunucu aşağıdaki türleri doğru sunmalıdır:

- `.html`: `text/html; charset=utf-8`
- `.css`: `text/css; charset=utf-8`
- `.js`: `text/javascript` veya `application/javascript`
- `.json`: `application/json; charset=utf-8`
- `.woff2`: `font/woff2`
- `.svg`: `image/svg+xml`
- `.webp`: `image/webp`
- `.gif`: `image/gif`
- `.png`: `image/png`
- `.mp4`: `video/mp4`

MP4 için byte-range isteklerini destekleyen standart statik dosya sunumu kullanın. `programs.json` isteğinin bir WordPress HTML sayfasına veya genel `index.html` yanıtına dönmediğini kontrol edin. HTML/CSS/JS/JSON için Brotli veya gzip kullanılabilir. Dosya adları sürüm özeti içermediğinden tüm dosyalara kalıcı `immutable` önbellek uygulamayın; güncellemelerde HTML, CSS, JavaScript ve JSON önbelleğini geçersiz kılın.

## Yayından sonra kısa kontrol

1. Masaüstünde ve telefonda ana sayfa, menü ve bölüm keşfi açılıyor mu?
2. “Psikoloji” araması ve düzey/puan türü/dil filtreleri sonuç veriyor mu?
3. Program penceresi açılıyor ve seçim ücret bölümüne aktarılıyor mu?
4. Ücret, burs ve programın resmî sayfası bağlantıları açılıyor mu?
5. Telefon, WhatsApp ve resmî bilgi talep formu hedefleri doğru mu?
6. Kampüs sekmeleri, galeri, soru-cevap, video ve “Hareketi durdur” çalışıyor mu?
7. Tarayıcı Network/Console bölümünde eksik dosya veya JavaScript hatası var mı?
8. Mevcut WordPress alt sayfaları ve başvuru/form servisleri erişilebilir mi?

## İçerik ve işlev kapsamı

Program listesi yerel `programs.json` dosyasından okunur; otomatik üniversite veri senkronizasyonu yoktur. Program, yıl, ücret tablosu bağlantıları ve iletişim bilgileri üniversitenin güncel verisine göre bu dosyalardan yönetilir. Türkçe karakterleri korumak için dosyaları UTF-8 kaydedin.

Öğrenci mesajları kullanıcının onayladığı **örnek mesajlar** olarak görünür biçimde etiketlidir. Gerçek alıntı eklenmedikçe bu etiketler korunmalıdır.

Ücret bölümü seçilen programı gösterir ve resmî tabloya yönlendirir; hesaplayıcı değildir. Danışmanlık alanı telefon, WhatsApp ve mevcut resmî form bağlantılarıdır; yeni bir CRM veya form arka ucu eklenmemiştir. Kedu görseli yerel GIF/poster animasyonudur; mevcut Kedu sohbet eklentisinin sunucu kodunu içermez. Bu hizmetlerin yeni sunucuya taşınması ayrıca mevcut üniversite sistemleriyle entegrasyon gerektirir.

Sitenin çalışması için harici font/CDN hizmeti gerekmez; fontlar, Lenis, görseller ve video pakette yereldir. Resmî bilgi, form, sanal tur ve WhatsApp bağlantıları ilgili dış servislerde açılır. Kaynak ve lisans kayıtları `belgeler/` içindedir.
