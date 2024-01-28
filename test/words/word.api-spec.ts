const BASE_URL: string = 'http://localhost:3000';
const username: string = 'alex';
const password: string = '123456';

const getToken = async (): Promise<string> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data: { accessToken: string } = await response.json();

  return data.accessToken;
};

const getWordCount = async (): Promise<number> => {
  const token = await getToken();
  console.log(token);

  const response = await fetch(`${BASE_URL}/words/count`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data: number = await response.json();

  console.log(data);

  return data;
};

getWordCount();
