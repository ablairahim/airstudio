# Деплой на Vercel + Настройка почты

## 🚀 Деплой проекта

### 1. Подготовка к деплою
```bash
# Сначала убедитесь что все работает локально
npm run dev

# Сделайте билд для проверки
npm run build
```

### 2. Environment Variables для Vercel
В настройках проекта Vercel добавьте:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=hti0yt93
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-12-19
SANITY_API_TOKEN=your-sanity-api-token
NODE_ENV=production
```

### 3. Получение Sanity API Token
1. Зайдите в [Sanity Dashboard](https://sanity.io/manage)
2. Выберите ваш проект
3. API → Tokens → Add API Token
4. Дайте права "Editor" или "Admin"
5. Скопируйте токен в `SANITY_API_TOKEN`

## 📧 Настройка почты на домене

### Вариант 1: Zoho Mail (бесплатно)

#### Шаг 1: Регистрация
1. Перейдите на [zoho.com/mail](https://www.zoho.com/mail/)
2. Создайте аккаунт с вашим доменом

#### Шаг 2: DNS записи в Vercel
1. Vercel Dashboard → ваш проект → Settings → Domains
2. Выберите домен → DNS Records
3. Добавьте записи:

```
Type: MX, Name: @, Value: mx.zoho.com, Priority: 10
Type: MX, Name: @, Value: mx2.zoho.com, Priority: 20
Type: MX, Name: @, Value: mx3.zoho.com, Priority: 50
Type: TXT, Name: @, Value: zoho-verification=YOUR_CODE
Type: TXT, Name: @, Value: v=spf1 include:zoho.com ~all
```

### Вариант 2: Google Workspace ($6/месяц)

#### DNS записи для Google:
```
Type: MX, Name: @, Value: aspmx.l.google.com, Priority: 1
Type: MX, Name: @, Value: alt1.aspmx.l.google.com, Priority: 5
Type: MX, Name: @, Value: alt2.aspmx.l.google.com, Priority: 5
Type: MX, Name: @, Value: alt3.aspmx.l.google.com, Priority: 10
Type: MX, Name: @, Value: alt4.aspmx.l.google.com, Priority: 10
```

## ⚡ Оптимизации для производительности

### 1. Sanity CDN
✅ Уже включен в production (`useCdn: true`)

### 2. Кеширование API
✅ Кеш на 1 час для `/api/case-studies`

### 3. Предзагрузка изображений
✅ Изображения кейсов предзагружаются во время loading screen

### 4. Loading Screen
✅ Красивый loading screen с анимацией шторки

## 🔧 Проверка после деплоя

### Проверьте что работает:
- [ ] Сайт открывается
- [ ] Кейсы загружаются из Sanity
- [ ] Модальные окна работают
- [ ] Sanity Studio доступна на `/studio`
- [ ] Изображения загружаются быстро

### Проверьте почту:
- [ ] MX записи настроены
- [ ] Почтовый ящик создан
- [ ] Тестовое письмо отправлено/получено

## 🐛 Если что-то не работает

### Sanity не загружается:
1. Проверьте environment variables
2. Убедитесь что API Token имеет права
3. Проверьте project ID в Sanity Dashboard

### Почта не работает:
1. Подождите 24-48 часов (DNS propagation)
2. Проверьте MX записи: `nslookup -type=mx yourdomain.com`
3. Убедитесь что verification код правильный

## 📈 Мониторинг производительности

### Vercel Analytics
Включите в настройках проекта для отслеживания:
- Loading времени
- Core Web Vitals
- Трафика пользователей

### Sanity Analytics
Отслеживайте:
- API запросы
- CDN usage
- Bandwidth usage

---

**Готово!** Ваш портфолио теперь быстро загружается и у вас есть профессиональная почта 🎉 