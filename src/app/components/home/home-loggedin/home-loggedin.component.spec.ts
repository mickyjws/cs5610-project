import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeLoggedinComponent} from './home-loggedin.component';

describe('HomeLoggedinComponent', () => {
    let component: HomeLoggedinComponent;
    let fixture: ComponentFixture<HomeLoggedinComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeLoggedinComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeLoggedinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
