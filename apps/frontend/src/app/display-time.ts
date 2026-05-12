const zhCnDisplayFormatter = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  hour12: false,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

const zhCnTimeFormatter = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

function normalizeDateInput(value: string | number | Date) {
  const parsed = value instanceof Date ? new Date(value.getTime()) : new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

export function formatChinaDateTime(value: string | number | Date) {
  const parsed = normalizeDateInput(value);
  if (!parsed) {
    return String(value);
  }

  return zhCnDisplayFormatter.format(parsed).replace(/\//g, '-');
}

export function formatChinaTime(value: string | number | Date) {
  const parsed = normalizeDateInput(value);
  if (!parsed) {
    return String(value);
  }

  return zhCnTimeFormatter.format(parsed);
}
