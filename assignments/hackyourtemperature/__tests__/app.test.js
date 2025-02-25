import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);

describe('POST /weather', () => {
  it('should return correct weather in city', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'Kharkiv' });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain('Kharkiv');
  });

  it('should be if city not found', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'zaqwsxcde' });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ weatherText: 'City is not found!' });
  });

  it('should be if value cityName empty', async () => {
    const response = await request.post('/weather').send({ cityName: '' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'City name is required' });
  });
});
