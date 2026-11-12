// A tiny fake API so the demo works offline and the race condition is
// reproducible. Each user answers after a fixed delay: Ada is slow, Linus
// is fast, so clicking Ada then Linus makes the responses arrive out of order.
const users = {
  1: { id: 1, name: 'Ada Lovelace', role: 'Analyst', delay: 1600 },
  2: { id: 2, name: 'Linus Torvalds', role: 'Kernel maintainer', delay: 300 },
  3: { id: 3, name: 'Grace Hopper', role: 'Compiler pioneer', delay: 900 },
};

export const userIds = Object.keys(users).map(Number);

export function fetchUser(id, { signal } = {}) {
  return new Promise((resolve, reject) => {
    const user = users[id];

    if (signal?.aborted) {
      reject(new DOMException('The request was aborted.', 'AbortError'));
      return;
    }

    const timer = setTimeout(() => {
      if (user) {
        resolve({ id: user.id, name: user.name, role: user.role });
      } else {
        reject(new Error(`User ${id} not found`));
      }
    }, user?.delay ?? 500);

    // Behave like fetch(): an aborted request rejects with an AbortError.
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('The request was aborted.', 'AbortError'));
    });
  });
}
