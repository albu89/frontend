import { TestBed } from '@angular/core/testing';
import { LanguageService } from '@services/language.service';

describe('TranslationService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
