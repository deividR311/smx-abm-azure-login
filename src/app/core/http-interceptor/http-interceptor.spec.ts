import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HTTPLoaderInterceptor } from './http-interceptor';


describe('HTTPLoaderInterceptor', () => {
    let service: HTTPLoaderInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
        service = TestBed.inject(HTTPLoaderInterceptor);
    });


    /**
      * 
      * @returs {*}
      * @membersof HTTPLoaderInterceptor
      * @author Daniel Rodriguez
      */
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});
