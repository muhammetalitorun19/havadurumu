Bu proje, Express.js ve OpenWeatherMap API kullanarak hava durumu bilgisi sağlayan bir Node.js tabanlı API oluşturur.
Ana İşlevler:
Güncel Hava Durumu (/api/weather)
Şehir adına göre hava durumunu getirir.
Sıcaklık, açıklama, nem ve rüzgar hızı gibi bilgileri döndürür.
16 Günlük Hava Tahmini (/api/forecast)
Enlem ve boylam bilgilerine göre 16 günlük hava tahmini alır.
Saatlik Hava Tahmini (getHourlyForecast)
İlk 5 saatlik tahmini alır.
Verileri okunabilir bir saat formatına dönüştürerek JSON olarak döndürür.
Rüzgar Hızı (getWindSpeed)
Enlem ve boylam bilgilerine göre rüzgar hızını getirir.
Harita Üzerinde Hava Durumu Gösterimi (loadMap & getWeatherInfo)
Leaflet.js ile harita yükler.
Harita üzerinde sıcaklık ve hava durumu bilgisini içeren işaretleyiciler ekler.
Geçmiş Hava Durumu (getHistoricalWeather & fetchHistoricalWeather)
Kullanıcının seçtiği tarihe ait hava durumu bilgisini getirir.
Kullanılan Teknolojiler:
Express.js: API oluşturma
node-fetch: OpenWeatherMap API’den veri çekme
CORS: Çapraz kaynak isteklerine izin verme
Leaflet.js: Harita gösterimi
Bu proje, hava durumu bilgisini API üzerinden almak, harita üzerinde göstermek ve geçmiş verileri incelemek için kapsamlı bir çözüm sunar.
