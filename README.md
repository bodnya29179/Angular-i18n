# Angular i18n

## Installation

Run the commands:
* `npm install @ngx-translate/core --save`
* `npm install @ngx-translate/http-loader --save`

## Steps
### 1. Loader service
Creating the TranslationLoader service:
```ts
@Injectable()
export class TranslationLoaderService {
  constructor(
    private http: HttpClient,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('en-US');
    this.translate.use('en-US');
  }

  loadTranslation(): Observable<any> {
    return this.http.get(`./assets/i18n/${ this.translate.currentLang }.json`);
  }
}
```

...and providing it in the AppModule:

```ts
@NgModule({
  ...
  imports: [
    ...
    HttpClientModule,
  ],
  providers: [
    ...
    TranslationLoaderService,
  ],
})
export class AppModule {}
```

### 2. Import the `TranslateModule`
Configure the `TranslateModule`:

```ts
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  ...
  imports: [
    ...
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class AppModule {}
```

### 3. Load the i18n JSON when the app starts

To load the i18n JSON file at first in an Angular application, you can use Angular's built-in `APP_INITIALIZER` provider
to execute a function before the application starts.

```ts
@NgModule({
  ...
  providers: [
    ...
    {
      provide: APP_INITIALIZER,
      useFactory: (translationLoader: TranslationLoaderService) => () => translationLoader.loadTranslation(),
      deps: [TranslationLoaderService],
      multi: true,
    },
  ],
})
export class AppModule {}
```

### 4. Result
Now you can use translate pipe with arguments (optional) without any problems:
* Getting translation:
```
{{ 'your.translation.key' | translate }}
```

* Getting translation with passing params:
```
{{ 'your.translation.key' | translate : { paramName: value, ... } }}
```

<br/>
You can also use the `instant()` method of the `translate` service in components too:
* Getting translation:
```
this.translate.instant('your.translation.key');
```

* Getting translation with passing params:
```
this.translate.instant('your.translation.key', { paramName: value, ... });
```

## References
- [ngx-translate](https://github.com/ngx-translate/core)
