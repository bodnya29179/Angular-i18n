import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

enum Languages {
  en = 'en-US',
  ua = 'ua',
}

@Component({
  selector: 'app-root',
  template: `
    <!-- Getting the translations in the template -->
    <div>
      <button (click)="toggleLanguage()">Toggle language</button>
      <p>{{ buildTranslationKey('example') | translate }}</p>
      <p>{{ buildTranslationKey('exampleWithParams') | translate : { day: 123 } }}</p>
    </div>
  `,
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    /* Getting the translations in the class */
    const key1 = this.buildTranslationKey('example');
    console.log(this.translate.instant(key1));

    const key2 = this.buildTranslationKey('exampleWithParams');
    console.log(this.translate.instant(key2, { day: 123 }));
  }

  buildTranslationKey(relativeKey: string): string {
    return `someGroup.${ relativeKey }`;
  }

  toggleLanguage(): void {
    const language = this.translate.currentLang === Languages.en ? Languages.ua : Languages.en;
    this.translate.use(language);
  }
}
