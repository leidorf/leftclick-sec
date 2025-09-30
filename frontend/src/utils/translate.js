import messages from '../locales/tr/common.json';

export function translate(key, status) {
  const group = messages.messages[status];
  if (group && key in group) {
    return group[key];
  }
  return key;
}
