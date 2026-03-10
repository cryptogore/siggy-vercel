const memory = {};

export function saveMessage(userId, user, assistant) {

  if (!memory[userId]) {
    memory[userId] = [];
  }

  memory[userId].push({
    user,
    assistant
  });
}

export function getHistory(userId) {

  return memory[userId] || [];
}