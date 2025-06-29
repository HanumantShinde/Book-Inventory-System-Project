import { HttpRequest } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  it('should add Authorization header when token exists', () => {
    localStorage.setItem('token', 'sample-token');

    const req = new HttpRequest('GET', '/api/books');
    const next = jasmine.createSpy('next');

    authInterceptor(req, next);

    expect(next).toHaveBeenCalled();
    const calledRequest = next.calls.mostRecent().args[0];
    expect(calledRequest.headers.get('Authorization')).toBe('Bearer sample-token');

    localStorage.removeItem('token');
  });

  it('should not add Authorization header when token does not exist', () => {
    localStorage.removeItem('token');

    const req = new HttpRequest('GET', '/api/books');
    const next = jasmine.createSpy('next');

    authInterceptor(req, next);

    expect(next).toHaveBeenCalled();
    const calledRequest = next.calls.mostRecent().args[0];
    expect(calledRequest.headers.has('Authorization')).toBeFalse();
  });
});
