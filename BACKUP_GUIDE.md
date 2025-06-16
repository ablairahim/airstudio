# 🛡️ AirStudio Backup & Recovery Guide

## 🎯 Цель
Этот гайд поможет тебе легко создавать бэкапы и восстанавливаться к рабочему состоянию, если что-то пойдет не так.

## 🔄 Способы бэкапа

### 1. 🚀 Быстрый способ - Скрипт backup.sh

```bash
# Создать бэкап
./backup.sh backup

# Посмотреть все бэкапы
./backup.sh list

# Восстановиться из бэкапа
./backup.sh restore

# Git откат
./backup.sh git
```

### 2. 📝 Git способ (основной)

```bash
# Сохранить текущее состояние
git add .
git commit -m "Описание изменений"
git push origin main

# Откатиться к стабильной версии
git checkout v1.0-stable
npm install

# Откатиться к предыдущему коммиту
git reset --hard HEAD~1
npm install

# Посмотреть историю
git log --oneline -10
```

### 3. 💾 Ручной бэкап

```bash
# Создать папку для бэкапов
mkdir -p ~/Documents/backups/airstudio

# Скопировать проект
cp -r . ~/Documents/backups/airstudio/backup_$(date +%Y%m%d_%H%M%S)

# Удалить ненужные файлы из бэкапа
rm -rf ~/Documents/backups/airstudio/backup_*/node_modules
rm -rf ~/Documents/backups/airstudio/backup_*/.next
```

## 🆘 Экстренное восстановление

### Если проект сломался:

1. **Быстрый откат к стабильной версии:**
   ```bash
   git checkout v1.0-stable
   npm install
   npm run dev
   ```

2. **Восстановление из бэкапа:**
   ```bash
   ./backup.sh restore
   # Выбери нужный бэкап из списка
   ```

3. **Если Git не работает:**
   ```bash
   # Удали проект и склонируй заново
   cd ..
   rm -rf airstudio
   git clone https://github.com/ablairahim/airstudio.git
   cd airstudio
   npm install
   ```

## 📋 Чек-лист перед экспериментами

- [ ] Создай коммит: `git add . && git commit -m "Before experiments"`
- [ ] Создай бэкап: `./backup.sh backup`
- [ ] Убедись что сборка работает: `npm run build`
- [ ] Проверь что сервер запускается: `npm run dev`

## 🏷️ Стабильные версии

- **v1.0-stable** - Рабочая версия с дизайн-системой и логотипом
- **main** - Последняя версия в репозитории

## 📁 Структура бэкапов

```
~/Documents/backups/airstudio/
├── backup_20250616_194703/  # Автоматический бэкап
├── backup_20250617_120000/  # Следующий бэкап
└── ...                      # Хранится последние 5 бэкапов
```

## 🔧 Полезные команды

```bash
# Проверить статус Git
git status

# Посмотреть изменения
git diff

# Отменить изменения в файле
git checkout -- filename

# Отменить все изменения
git reset --hard HEAD

# Посмотреть все теги
git tag -l

# Создать новый тег
git tag -a v1.1-stable -m "Description"
git push origin v1.1-stable
```

## 🚨 Что делать если все сломалось

1. **Не паникуй!** 😌
2. Попробуй `git checkout v1.0-stable`
3. Если не помогло, используй `./backup.sh restore`
4. В крайнем случае, склонируй проект заново с GitHub

## 💡 Советы

- **Делай коммиты часто** - после каждой рабочей фичи
- **Создавай теги** для стабильных версий
- **Тестируй сборку** перед коммитом: `npm run build`
- **Делай бэкапы** перед большими изменениями
- **Пиши понятные сообщения** в коммитах

---

**Помни:** Лучше сделать лишний бэкап, чем потерять рабочий код! 🛡️ 