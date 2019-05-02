import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { RegisterComponent } from './register.component';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../../shared/shared.module';


const testConfig = {
    userData: {
      firstName: 'test',
      lastName: 'testLast',
      userId: 'testUser',
      password: 'testPass'
    }
  }
  
  describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let authService: AuthenticationService;
    let spyUser: any;
    let routes: Router;
    let location: Location;

    class AuthServiceStub {
        currentUser: any;
        
        constructor() {
    
         }

         register(credentials) {
            if(credentials.userId == testConfig.userData.userId) {
              console.log('data:::', this.currentUser);
              return of(credentials.userId);
            } else {
              return of(false);
            }
          }
        }

        class dummy {

        }

        beforeEach(async(() => {
            TestBed.configureTestingModule({
              declarations: [ RegisterComponent ],
              imports: [SharedModule, HttpClientModule,
                RouterTestingModule.withRoutes(
                  [{path: '', component: dummy}]
                )
              ],
              providers: [{provide: AuthenticationService, useClass: AuthServiceStub}]
            })
            .compileComponents();
          }));

          beforeEach(() => {
            routes = TestBed.get(Router);
            fixture = TestBed.createComponent(RegisterComponent);
            location = TestBed.get(Location);
            component = fixture.componentInstance;
            fixture.detectChanges();
            fixture.debugElement.injector.get(AuthenticationService);
          });

          it('should create register component', async(() => {
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
          }));

          it('should contain four input box for firstname, lastname, userId and password', () => {
            let userId = fixture.debugElement.query(By.css('#userId'));
            let password = fixture.debugElement.query(By.css('#password'));
            let firstName = fixture.debugElement.query(By.css('#firstName'));
            let lastName = fixture.debugElement.query(By.css('#lastName'));
        
            let userIdInput = userId.nativeElement;
            let passwordInput = password.nativeElement;
            let userfirstname = firstName.nativeElement;
            let userlastName = lastName.nativeElement;
        
            expect(userIdInput).toBeTruthy();
            expect(passwordInput).toBeTruthy();
            expect(userfirstname).toBeTruthy();
            expect(userlastName).toBeTruthy();
          });

          it('should redirect to login if registered successfully', async(() => {
            let userId = fixture.debugElement.query(By.css('#userId'));
            let password = fixture.debugElement.query(By.css('#password'));
            let firstName = fixture.debugElement.query(By.css('#firstName'));
            let lastName = fixture.debugElement.query(By.css('#lastName'));
            let registerbutton=fixture.debugElement.query(By.css('.register-user'));
        
            let userIdInput = userId.nativeElement;
            let passwordInput = password.nativeElement;
            let userfirstname = firstName.nativeElement;
            let userlastName = lastName.nativeElement;
            let userregisterButton= registerbutton.nativeElement;
            fixture.detectChanges();
            fixture.whenStable().then(() => {
              userIdInput.value = 'testuser';
              passwordInput.value = 'testpass';
              userfirstname.value= 'testfirstname';
              userlastName.value= 'testlastname';
              userIdInput.dispatchEvent(new Event('inptut'));
              passwordInput.dispatchEvent(new Event('inptut'));
              userregisterButton.click();
            }).then(() => {
              expect(location.path()).toBe('');
            });
          }));

        });