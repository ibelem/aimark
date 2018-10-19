<template>
  <div class="container">
    <ai_nav/>
    <section class="section hero">
      <h2 class="has-text-primary is-size-5-desktop is-size-6-mobile is-size-5-tablet mb ic">Performance Ranking</h2>
      <b-tabs>
        <b-tab-item label="Desktops" icon="desktop-mac">
          <div v-for="desktop of desktops" :key="desktop.id" class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class='cap' v-if="desktop == 'Windows'">
<svg aria-hidden="true" data-prefix="fab" data-icon="windows" class="svg-inline--fa fa-windows fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"></path></svg> Windows 10 Desktop</div>
              <div class='cap' v-if="desktop == 'Mac OS'">
<svg aria-hidden="true" data-prefix="fab" data-icon="apple" class="svg-inline--fa fa-apple fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 376 512"><path fill="currentColor" d="M314.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C59.3 141.2 0 184.8 0 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg> Mac Desktop</div>
              <div class='cap' v-if="desktop == 'Ubuntu'">
<svg aria-hidden="true" data-prefix="fab" data-icon="linux" class="svg-inline--fa fa-linux fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M196.1 123.6c-.2-1.4 1.9-2.3 3.2-2.9 1.7-.7 3.9-1 5.5-.1.4.2.8.7.6 1.1-.4 1.2-2.4 1-3.5 1.6-1 .5-1.8 1.7-3 1.7-1 .1-2.7-.4-2.8-1.4zm24.7-.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm214.7 310.2c-.5 8.2-6.5 13.8-13.9 18.3-14.9 9-37.3 15.8-50.9 32.2l-2.6-2.2 2.6 2.2c-14.2 16.9-31.7 26.6-48.3 27.9-16.5 1.3-32-6.3-40.3-23v-.1c-1.1-2.1-1.9-4.4-2.5-6.7-21.5 1.2-40.2-5.3-55.1-4.1-22 1.2-35.8 6.5-48.3 6.6-4.8 10.6-14.3 17.6-25.9 20.2-16 3.7-36.1 0-55.9-10.4l1.6-3-1.6 3c-18.5-9.8-42-8.9-59.3-12.5-8.7-1.8-16.3-5-20.1-12.3-3.7-7.3-3-17.3 2.2-31.7 1.7-5.1.4-12.7-.8-20.8-.6-3.9-1.2-7.9-1.2-11.8 0-4.3.7-8.5 2.8-12.4 4.5-8.5 11.8-12.1 18.5-14.5 6.7-2.4 12.8-4 17-8.3 5.2-5.5 10.1-14.4 16.6-20.2-2.6-17.2.2-35.4 6.2-53.3 12.6-37.9 39.2-74.2 58.1-96.7 16.1-22.9 20.8-41.3 22.5-64.7C158 103.4 132.4-.2 234.8 0c80.9.1 76.3 85.4 75.8 131.3-.3 30.1 16.3 50.5 33.4 72 15.2 18 35.1 44.3 46.5 74.4 9.3 24.6 12.9 51.8 3.7 79.1 1.4.5 2.8 1.2 4.1 2 1.4.8 2.7 1.8 4 2.9 6.6 5.6 8.7 14.3 10.5 22.4 1.9 8.1 3.6 15.7 7.2 19.7 11.1 12.4 15.9 21.5 15.5 29.7zM220.8 109.1c3.6.9 8.9 2.4 13 4.4-2.1-12.2 4.5-23.5 11.8-23 8.9.3 13.9 15.5 9.1 27.3-.8 1.9-2.8 3.4-3.9 4.6 6.7 2.3 11 4.1 12.6 4.9 7.9-9.5 10.8-26.2 4.3-40.4-9.8-21.4-34.2-21.8-44 .4-3.2 7.2-3.9 14.9-2.9 21.8zm-46.2 18.8c7.8-5.7 6.9-4.7 5.9-5.5-8-6.9-6.6-27.4 1.8-28.1 6.3-.5 10.8 10.7 9.6 19.6 3.1-2.1 6.7-3.6 10.2-4.6 1.7-19.3-9-33.5-19.1-33.5-18.9 0-24 37.5-8.4 52.1zm-9.4 20.9c1.5 4.9 6.1 10.5 14.7 15.3 7.8 4.6 12 11.5 20 15 2.6 1.1 5.7 1.9 9.6 2.1 18.4 1.1 27.1-11.3 38.2-14.9 11.7-3.7 20.1-11 22.7-18.1 3.2-8.5-2.1-14.7-10.5-18.2-11.3-4.9-16.3-5.2-22.6-9.3-10.3-6.6-18.8-8.9-25.9-8.9-14.4 0-23.2 9.8-27.9 14.2-.5.5-7.9 5.9-14.1 10.5-4.2 3.3-5.6 7.4-4.2 12.3zm-33.5 252.8L112.1 366c-6.8-9.2-13.8-14.8-21.9-16-7.7-1.2-12.6 1.4-17.7 6.9-4.8 5.1-8.8 12.3-14.3 18-7.8 6.5-9.3 6.2-19.6 9.9-6.3 2.2-11.3 4.6-14.8 11.3-2.7 5-2.1 12.2-.9 20 1.2 7.9 3 16.3.6 23.9v.2c-5 13.7-5 21.7-2.6 26.4 7.9 15.4 46.6 6.1 76.5 21.9 31.4 16.4 72.6 17.1 75.3-18 2.1-20.5-31.5-49-41-68.9zm153.9 35.8c3.2-11 6.3-21.3 6.8-29 .8-15.2 1.6-28.7 4.4-39.9 3.1-12.6 9.3-23.1 21.4-27.3 2.3-21.1 18.7-21.1 38.3-12.5 18.9 8.5 26 16 22.8 26.1 1 0 2-.1 4.2 0 5.2-16.9-14.3-28-30.7-34.8 2.9-12 2.4-24.1-.4-35.7-6-25.3-22.6-47.8-35.2-59-2.3-.1-2.1 1.9 2.6 6.5 11.6 10.7 37.1 49.2 23.3 84.9-3.9-1-7.6-1.5-10.9-1.4-5.3-29.1-17.5-53.2-23.6-64.6-11.5-21.4-29.5-65.3-37.2-95.7-4.5 6.4-12.4 11.9-22.3 15-4.7 1.5-9.7 5.5-15.9 9-13.9 8-30 8.8-42.4-1.2-4.5-3.6-8-7.6-12.6-10.3-1.6-.9-5.1-3.3-6.2-4.1-2 37.8-27.3 85.3-39.3 112.7-8.3 19.7-13.2 40.8-13.8 61.5-21.8-29.1-5.9-66.3 2.6-82.4 9.5-17.6 11-22.5 8.7-20.8-8.6 14-22 36.3-27.2 59.2-2.7 11.9-3.2 24 .3 35.2 3.5 11.2 11.1 21.5 24.6 29.9 0 0 24.8 14.3 38.3 32.5 7.4 10 9.7 18.7 7.4 24.9-2.5 6.7-9.6 8.9-16.7 8.9 4.8 6 10.3 13 14.4 19.6 37.6 25.7 82.2 15.7 114.3-7.2zM415 408.5c-10-11.3-7.2-33.1-17.1-41.6-6.9-6-13.6-5.4-22.6-5.1-7.7 8.8-25.8 19.6-38.4 16.3-11.5-2.9-18-16.3-18.8-29.5-.3.2-.7.3-1 .5-7.1 3.9-11.1 10.8-13.7 21.1-2.5 10.2-3.4 23.5-4.2 38.7-.7 11.8-6.2 26.4-9.9 40.6-3.5 13.2-5.8 25.2-1.1 36.3 7.2 14.5 19.5 20.4 33.7 19.3 14.2-1.1 30.4-9.8 43.6-25.5 22-26.6 62.3-29.7 63.2-46.5.3-5.1-3.1-13-13.7-24.6zM173.3 148.7c2 1.9 4.7 4.5 8 7.1 6.6 5.2 15.8 10.6 27.3 10.6 11.6 0 22.5-5.9 31.8-10.8 4.9-2.6 10.9-7 14.8-10.4 3.9-3.4 5.9-6.3 3.1-6.6-2.8-.3-2.6 2.6-6 5.1-4.4 3.2-9.7 7.4-13.9 9.8-7.4 4.2-19.5 10.2-29.9 10.2-10.4 0-18.7-4.8-24.9-9.7-3.1-2.5-5.7-5-7.7-6.9-1.5-1.4-1.9-4.6-4.3-4.9-1.4-.1-1.8 3.7 1.7 6.5z"></path></svg> Linux Desktop</div>
              <div class='ic mb blank'></div>
                <b-tabs type="is-toggle" position="is-centered" class="block" size="is-small">
                  <b-tab-item v-for="backend of backends" :key="backend.id" :label="backend">
                    <div class='columns mb'>
                      <div class="column is-mobile is-12 ic">
                        <div class="mb mt ir">
                          <b-table :data="ranking" 
                          :default-sort-direction="defaultSortDirection"
                          default-sort="cpu"
                          :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
                            <template slot-scope="props" v-if='props.row.Backend == backend && props.row.OS == desktop'>
                              <b-table-column field="Model" label="Model" sortable>
                                {{ props.row.Model }}
                              </b-table-column>
                              
                              <b-table-column field="CPU" label="CPU" sortable>
                                {{ props.row.CPU }}
                              </b-table-column>
                              <b-table-column field="GPU" label="GPU" sortable>
                                {{ props.row.GPU }}
                              </b-table-column>
                              <b-table-column field="RAM" label="RAM" sortable>
                                {{ props.row.RAM }}
                              </b-table-column>
                              <b-table-column field="OS_Version" label="OS Version" sortable>
                                {{ props.row.OS_Version.replace('10 ','') }}
                              </b-table-column>
                              <b-table-column field="Chromium" label="Chromium" sortable>
                                {{ props.row.Chromium }}
                              </b-table-column>

                              <b-table-column v-if="props.row.BackendNative" field="BackendNative" label="Backend" sortable>
                                {{ props.row.BackendNative }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.test1 == 0" field="test1" label="Test 1 (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="test1" label="Test 1 (ms)" sortable>
                                {{ props.row.test1 }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.test2 == 0" field="test2" label="Test 2 (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="test2" label="Test 2 (ms)" sortable>
                                {{ props.row.test2 }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.test3 == 0" field="test3" label="Test 3 (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="test3" label="Test 3 (ms)" sortable>
                                {{ props.row.test3 }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.test4 == 0" field="test4" label="Test 4 (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="test4" label="Test 4 (ms)" sortable>
                                {{ props.row.test4 }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.test5 == 0" field="test5" label="Test 5 (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="test5" label="Test 5 (ms)" sortable>
                                {{ props.row.test5 }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.test6 == 0" field="test6" label="Test 6 (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="test6" label="Test 6 (ms)" sortable>
                                {{ props.row.test6 }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="total" label="Total (ms)" sortable>
                                <b-tooltip v-if="getFast(desktop, backend) == props.row.total" label="Best" always>
                                  {{ props.row.total }}
                                </b-tooltip>
                                <b-tooltip v-else>
                                  {{ props.row.total }}
                                </b-tooltip>
                              </b-table-column>
                            </template>

                            <template slot="empty">
                              <section class="section">
                                <div class="content has-text-grey has-text-centered">
                                  <p>
                                    <b-icon icon="emoticon-sad" size="is-large">
                                    </b-icon>
                                  </p>
                                  <p>Nothing here.</p>
                                </div>
                              </section>
                            </template>
                          </b-table>
                        </div>
                      </div> 
                    </div>
                  </b-tab-item>
                </b-tabs>
            </div> 
          </div>
        </b-tab-item>
        <b-tab-item label="Phones" icon="cellphone-iphone">
          <div v-for="phone of phones" :key="phone.id" class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class='cap' v-if="phone == 'Android'"><svg aria-hidden="true" data-prefix="fab" data-icon="android" class="svg-inline--fa fa-android fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M89.6 204.5v115.8c0 15.4-12.1 27.7-27.5 27.7-15.3 0-30.1-12.4-30.1-27.7V204.5c0-15.1 14.8-27.5 30.1-27.5 15.1 0 27.5 12.4 27.5 27.5zm10.8 157c0 16.4 13.2 29.6 29.6 29.6h19.9l.3 61.1c0 36.9 55.2 36.6 55.2 0v-61.1h37.2v61.1c0 36.7 55.5 36.8 55.5 0v-61.1h20.2c16.2 0 29.4-13.2 29.4-29.6V182.1H100.4v179.4zm248-189.1H99.3c0-42.8 25.6-80 63.6-99.4l-19.1-35.3c-2.8-4.9 4.3-8 6.7-3.8l19.4 35.6c34.9-15.5 75-14.7 108.3 0L297.5 34c2.5-4.3 9.5-1.1 6.7 3.8L285.1 73c37.7 19.4 63.3 56.6 63.3 99.4zm-170.7-55.5c0-5.7-4.6-10.5-10.5-10.5-5.7 0-10.2 4.8-10.2 10.5s4.6 10.5 10.2 10.5c5.9 0 10.5-4.8 10.5-10.5zm113.4 0c0-5.7-4.6-10.5-10.2-10.5-5.9 0-10.5 4.8-10.5 10.5s4.6 10.5 10.5 10.5c5.6 0 10.2-4.8 10.2-10.5zm94.8 60.1c-15.1 0-27.5 12.1-27.5 27.5v115.8c0 15.4 12.4 27.7 27.5 27.7 15.4 0 30.1-12.4 30.1-27.7V204.5c0-15.4-14.8-27.5-30.1-27.5z"></path></svg> Android Phone</div>
              <div class='cap' v-if="phone == 'iOS'">
<svg aria-hidden="true" data-prefix="fab" data-icon="apple" class="svg-inline--fa fa-apple fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 376 512"><path fill="currentColor" d="M314.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C59.3 141.2 0 184.8 0 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg> iOS Phone</div>
              <div class='ic mb blank'></div>
                <b-tabs type="is-toggle" position="is-centered" class="block" size="is-small">
                  <b-tab-item v-for="backend of backends" :key="backend.id" :label="backend">
                    <div class='columns mb'>
                      <div class="column is-mobile is-12 ic">
                        <div class="mb mt ir">
                          <b-table :data="ranking" 
                          :default-sort-direction="defaultSortDirection"
                          default-sort="cpu"
                          :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
                            <template slot-scope="props" v-if='props.row.Backend == backend && props.row.OS == phone'>
                              <b-table-column field="Model" label="Model" sortable>
                                {{ props.row.Model }}
                              </b-table-column>
                              
                              <b-table-column field="CPU" label="CPU" sortable>
                                {{ props.row.CPU }}
                              </b-table-column>
                              <b-table-column field="GPU" label="GPU" sortable>
                                {{ props.row.GPU }}
                              </b-table-column>
                              <b-table-column field="RAM" label="RAM" sortable>
                                {{ props.row.RAM }}
                              </b-table-column>
                              <b-table-column field="OS_Version" label="OS Version" sortable>
                                {{ props.row.OS_Version.replace('10 ','') }}
                              </b-table-column>
                              <b-table-column field="Chromium" label="Chromium" sortable>
                                {{ props.row.Chromium }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.test1 == 0" field="test1" label="Test 1 (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="test1" label="Test 1 (ms)" sortable>
                                {{ props.row.test1 }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.test2 == 0" field="test2" label="Test 2 (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="test2" label="Test 2 (ms)" sortable>
                                {{ props.row.test2 }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.test3 == 0" field="test3" label="Test 3 (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="test3" label="Test 3 (ms)" sortable>
                                {{ props.row.test3 }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.test4 == 0" field="test4" label="Test 4 (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="test4" label="Test 4 (ms)" sortable>
                                {{ props.row.test4 }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.test5 == 0" field="test5" label="Test 5 (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="test5" label="Test 5 (ms)" sortable>
                                {{ props.row.test5 }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.test6 == 0" field="test6" label="Test 6 (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="test6" label="Test 6 (ms)" sortable>
                                {{ props.row.test6 }}
                              </b-table-column>
                              
                              <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
                                N/A
                              </b-table-column>
                              <b-table-column v-else field="total" label="Total (ms)" sortable>
                                <b-tooltip v-if="getFast(phone, backend) == props.row.total" label="Best" always>
                                  {{ props.row.total }}
                                </b-tooltip>
                                <b-tooltip v-else>
                                  {{ props.row.total }}
                                </b-tooltip>
                              </b-table-column>
                            </template>

                            <template slot="empty">
                              <section class="section">
                                <div class="content has-text-grey has-text-centered">
                                  <p>
                                    <b-icon icon="emoticon-sad" size="is-large">
                                    </b-icon>
                                  </p>
                                  <p>Nothing here.</p>
                                </div>
                              </section>
                            </template>
                          </b-table>
                        </div>
                      </div> 
                    </div>
                  </b-tab-item>
                </b-tabs>
            </div> 
          </div>
        </b-tab-item>
      </b-tabs>

    </section>
    <ai_footer/>
  </div>
</template>

<script>
  import ai_nav from "~/components/ai_nav.vue";
  import ai_footer from "~/components/ai_footer.vue";
  
  export default {
    components: {
      ai_nav,
      ai_footer
    },
    mounted() {},
    asyncData() {
      return new Promise(resolve => {
        setTimeout(function() {
          resolve({});
        }, 1000);
      });
    },
    methods: {
      arrayMin: function(array) {
        return Math.min.apply(Math, array);
      },
      getFast: function(os, backend) {
        let a = [];
        this.ranking.map((item) => {
          if (item.OS == os && item.total != 0 && item.Backend == backend) {
            a.push(item.total);
          }
        })
        return this.arrayMin(a)
      }
    },
    computed: {
    },
    data() {
      return {
        // isPaginated: true,
        // isPaginationSimple: false,
        defaultSortDirection: "asc",
        // currentPage: 1,
        // perPage: 30,
        desktops: ["Windows", "Ubuntu", "Mac OS"],
        backends: ["WebML", "WASM", "WebGL2"],
        phones: ["Android"],
        ranking: [{
            Type: "Laptop",
            Model: "Dell XPS 13-9360",
            CPU: "i5-8250U",
            GPU: "UHD 620",
            RAM: "8G",
            OS: "Windows",
            OS_Version: "10 1803 17134.345",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            test1: 504,
            test2: 337.73,
            test3: 333.23,
            test4: 1128.6,
            test5: 925.87,
            test6: 4567.03,
            total: 7796.46
          },
          {
            Type: "Laptop",
            Model: "Dell XPS 13-9360",
            CPU: "i5-8250U",
            GPU: "UHD 620",
            RAM: "8G",
            OS: "Windows",
            OS_Version: "10 1803 17134.345",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            test1: 181.9,
            test2: 92.67,
            test3: 139.77,
            test4: 343.5,
            test5: 220.67,
            test6: 1598.73,
            total: 2577.24
          },
          {
            Type: "Laptop",
            Model: "Dell XPS 13-9360",
            CPU: "i5-8250U",
            GPU: "UHD 620",
            RAM: "8G",
            OS: "Windows",
            OS_Version: "10 1803 17134.345",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            test1: 12.9,
            test2: 12.47,
            test3: 7.63,
            test4: 23.27,
            test5: 16.73,
            test6: 54.2,
            total: 127.2
          },
          {
            Type: "Laptop",
            Model: "Dell Inspiron 13-7359",
            CPU: "i5-6200U",
            GPU: "HD 520",
            RAM: "4G",
            OS: "Windows",
            OS_Version: "10 1709 16299.371",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            test1: 1527.47,
            test2: 1005.03,
            test3: 705.9,
            test4: 2392.9,
            test5: 2370.13,
            test6: 11091,
            total: 19092.43
          },
          {
            Type: "Laptop",
            Model: "Dell Inspiron 13-7359",
            CPU: "i5-6200U",
            GPU: "HD 520",
            RAM: "4G",
            OS: "Windows",
            OS_Version: "10 1709 16299.371",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            test1: 511.7,
            test2: 308.2,
            test3: 1034.63,
            test4: 1050.7,
            test5: 752.1,
            test6: 5727.8,
            total: 9385.13
          },
          {
            Type: "Laptop",
            Model: "Dell Inspiron 13-7359",
            CPU: "i5-6200U",
            GPU: "HD 520",
            RAM: "4G",
            OS: "Windows",
            OS_Version: "10 1709 16299.371",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            test1: 37.53,
            test2: 38.23,
            test3: 19.53,
            test4: 79.3,
            test5: 59.3,
            test6: 171.83,
            total: 405.72
          },
          {
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-8700K",
            GPU: "UHD 630",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1809 17763.17",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            test1: 370.57,
            test2: 243.3,
            test3: 218.97,
            test4: 767.23,
            test5: 643.97,
            test6: 3248.57,
            total: 5492.61
          },
          {
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-8700K",
            GPU: "UHD 630",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1809 17763.17",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            test1: 177.37,
            test2: 72.93,
            test3: 110.97,
            test4: 278.57,
            test5: 192.03,
            test6: 1365.97,
            total: 2197.84
          },
          {
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-8700K",
            GPU: "UHD 630",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1809 17763.17",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            test1: 9.3,
            test2: 9.13,
            test3: 5.93,
            test4: 18.93,
            test5: 13.43,
            test6: 43.03,
            total: 99.75
          },
          {
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-6700K",
            GPU: "HD 530",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1809 17763.17",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            test1: 406.07,
            test2: 261.83,
            test3: 237.6,
            test4: 857.57,
            test5: 707,
            test6: 3573.27,
            total: 6043.34
          },
          {
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-6700K",
            GPU: "HD 530",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1809 17763.17",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            test1: 144.83,
            test2: 90.93,
            test3: 129.3,
            test4: 322.93,
            test5: 217.4,
            test6: 1494.23,
            total: 2399.62
          },
          {
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-6700K",
            GPU: "HD 530",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1809 17763.17",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            test1: 9.43,
            test2: 9.33,
            test3: 6.03,
            test4: 20.33,
            test5: 14,
            test6: 46.57,
            total: 105.69
          },
          {
            Type: "Phone",
            Model: "Google Pixel 2 G011A",
            CPU: "Snapdragon 835",
            GPU: "Adreno 540",
            RAM: "4G",
            OS: "Android",
            OS_Version: "8.1.0",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            test1: 1580.7,
            test2: 1053.7,
            test3: 921.07,
            test4: 3323.9,
            test5: 2758.43,
            test6: 14089.13,
            total: 23726.93
          },
          {
            Type: "Phone",
            Model: "Google Pixel 2 G011A",
            CPU: "Snapdragon 835",
            GPU: "Adreno 540",
            RAM: "4G",
            OS: "Android",
            OS_Version: "8.1.0",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            test1: 271.57,
            test2: 207.67,
            test3: 245.37,
            test4: 572.93,
            test5: 390.83,
            test6: 1842.7,
            total: 3531.07
          },
          {
            Type: "Phone",
            Model: "Google Pixel 2 G011A",
            CPU: "Snapdragon 835",
            GPU: "Adreno 540",
            RAM: "4G",
            OS: "Android",
            OS_Version: "8.1.0",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            test1: 240.03,
            test2: 198.7,
            test3: 162,
            test4: 462.53,
            test5: 412,
            test6: 1673.93,
            total: 3149.19
          },
          {
            Type: "Phone",
            Model: "Google Pixel 2 XL G011C",
            CPU: "Snapdragon 835",
            GPU: "Adreno 540",
            RAM: "4G",
            OS: "Android",
            OS_Version: "9",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            test1: 1584.3,
            test2: 1045.47,
            test3: 919.57,
            test4: 3331.63,
            test5: 2780.2,
            test6: 13607.53,
            total: 23268.7
          },
          {
            Type: "Phone",
            Model: "Google Pixel 2 XL G011C",
            CPU: "Snapdragon 835",
            GPU: "Adreno 540",
            RAM: "4G",
            OS: "Android",
            OS_Version: "9",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            test1: 233.53,
            test2: 216.27,
            test3: 231.5,
            test4: 558.33,
            test5: 378.7,
            test6: 2314.6,
            total: 3932.93
          },
          {
            Type: "Phone",
            Model: "Google Pixel 2 XL G011C",
            CPU: "Snapdragon 835",
            GPU: "Adreno 540",
            RAM: "4G",
            OS: "Android",
            OS_Version: "9",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            test1: 248.8,
            test2: 122,
            test3: 51.83,
            test4: 243.53,
            test5: 128.93,
            test6: 764.03,
            total: 1559.12
          },
          {
            Type: "Phone",
            Model: "Huawei P20 Pro CLT-AL01",
            CPU: "Kirin 970",
            GPU: "Mali-G72",
            RAM: "6G",
            OS: "Android",
            OS_Version: "8.1.0",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            test1: 1594.83,
            test2: 1052.3,
            test3: 923.53,
            test4: 3373.3,
            test5: 2788.87,
            test6: 13853,
            total: 23585.83
          },
          {
            Type: "Phone",
            Model: "Huawei P20 Pro CLT-AL01",
            CPU: "Kirin 970",
            GPU: "Mali-G72",
            RAM: "6G",
            OS: "Android",
            OS_Version: "8.1.0",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            test1: 480.2,
            test2: 313.47,
            test3: 532.23,
            test4: 868.9,
            test5: 483,
            test6: 3483.87,
            total: 6161.67
          },
          {
            Type: "Phone",
            Model: "Huawei P20 Pro CLT-AL01",
            CPU: "Kirin 970",
            GPU: "Mali-G72",
            RAM: "6G",
            OS: "Android",
            OS_Version: "8.1.0",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            test1: 97.07,
            test2: 117.97,
            test3: 50.63,
            test4: 174.5,
            test5: 191.4,
            test6: 157.83,
            total: 789.4
          },
          {
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.14",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            BackendNative: "MPS",
            test1: 507.63,
            test2: 335.53,
            test3: 298,
            test4: 1105.77,
            test5: 872.23,
            test6: 4335.7,
            total: 7454.86
          },
          {
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.14",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            BackendNative: "MPS",
            test1: 90.6,
            test2: 66.13,
            test3: 89.9,
            test4: 252.03,
            test5: 153.77,
            test6: 1084.13,
            total: 1736.56
          },
          {
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.14",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            BackendNative: "MPS",
            test1: 18.87,
            test2: 21.53,
            test3: 13.83,
            test4: 35.93,
            test5: 21.3,
            test6: 104.2,
            total: 215.66
          },
          {
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.14",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            BackendNative: "BNNS",
            test1: 507,
            test2: 333.8,
            test3: 297.63,
            test4: 1060.23,
            test5: 869.73,
            test6: 4333.9,
            total: 7402.29
          },
          {
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.14",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            BackendNative: "BNNS",
            test1: 84.1,
            test2: 64.53,
            test3: 85.5,
            test4: 39.13,
            test5: 18.63,
            test6: 1114.63,
            total: 1406.52
          },
          {
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.14",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            BackendNative: "BNNS",
            test1: "N/A",
            test2: "N/A",
            test3: 12.53,
            test4: "N/A",
            test5: "N/A",
            test6: 138.63,
            total: 0
          },
          {
            Type: "Desktop",
            Model: "iMac Pro",
            CPU: "Xeon W 3.2 GHz",
            GPU: "Radeon Pro Vega 56 8G",
            RAM: "32G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            BackendNative: "MPS",
            test1: 395.97,
            test2: 256,
            test3: 235.67,
            test4: 836.3,
            test5: 693.3,
            test6: 3501.47,
            total: 5918.71
          },
          {
            Type: "Desktop",
            Model: "iMac Pro",
            CPU: "Xeon W 3.2 GHz",
            GPU: "Radeon Pro Vega 56 8G",
            RAM: "32G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            BackendNative: "MPS",
            test1: 28.67,
            test2: 29.93,
            test3: 26.07,
            test4: 97.03,
            test5: 33.57,
            test6: 113.83,
            total: 329.1
          },
          {
            Type: "Desktop",
            Model: "iMac Pro",
            CPU: "Xeon W 3.2 GHz",
            GPU: "Radeon Pro Vega 56 8G",
            RAM: "32G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            BackendNative: "MPS",
            test1: 3.53,
            test2: 5.67,
            test3: 5.7,
            test4: 7.17,
            test5: 3.13,
            test6: 50.07,
            total: 75.27
          },
          {
            Type: "Desktop",
            Model: "iMac Pro",
            CPU: "Xeon W 3.2 GHz",
            GPU: "Radeon Pro Vega 56 8G",
            RAM: "32G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            BackendNative: "BNNS",
            test1: 395.8,
            test2: 256.3,
            test3: 237.8,
            test4: 850.37,
            test5: 697.23,
            test6: 3507.37,
            total: 5944.87
          },
          {
            Type: "Desktop",
            Model: "iMac Pro",
            CPU: "Xeon W 3.2 GHz",
            GPU: "Radeon Pro Vega 56 8G",
            RAM: "32G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            BackendNative: "BNNS",
            test1: 26.83,
            test2: 27.4,
            test3: 26.07,
            test4: 96.13,
            test5: 34.3,
            test6: 115.23,
            total: 325.96
          },
          {
            Type: "Desktop",
            Model: "iMac Pro",
            CPU: "Xeon W 3.2 GHz",
            GPU: "Radeon Pro Vega 56 8G",
            RAM: "32G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            BackendNative: "BNNS",
            test1: "N/A",
            test2: "N/A",
            test3: 10.13,
            test4: "N/A",
            test5: "N/A",
            test6: 48.97,
            total: 0
          },
          {
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-6700",
            GPU: "HD 530",
            RAM: "12G",
            OS: "Ubuntu",
            OS_Version: "16.04 LTS",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            BackendNative: "",
            test1: 353.70,
            test2: 226.63,
            test3: 212.70,
            test4: 747.63,
            test5: 617.07,
            test6: 3103.70,
            total: 5261.43
          },
          {
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-6700",
            GPU: "HD 530",
            RAM: "12G",
            OS: "Ubuntu",
            OS_Version: "16.04 LTS",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 125.93,
            test2: 87.90,
            test3: 127.77,
            test4: 303.93,
            test5: 208.50,
            test6: 1471.30,
            total: 2325.33
          },
          {
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-6700",
            GPU: "HD 530",
            RAM: "12G",
            OS: "Ubuntu",
            OS_Version: "16.04 LTS",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            BackendNative: "",
            test1: 9.70,
            test2: 10.10,
            test3: 5.67,
            test4: 20.00,
            test5: 14.07,
            test6: 53.07,
            total: 112.61
          },
          {
            Type: "Desktop",
            Model: "Dell XPS P82G",
            CPU: "i5-8250U",
            GPU: "UHD 620",
            RAM: "8G",
            OS: "Ubuntu",
            OS_Version: "16.04 LTS",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            BackendNative: "",
            test1: 410.03,
            test2: 254.9,
            test3: 238.97,
            test4: 851.6,
            test5: 708.43,
            test6: 3563.63,
            total: 6027.56
          },
          {
            Type: "Desktop",
            Model: "Dell XPS P82G",
            CPU: "i5-8250U",
            GPU: "UHD 620",
            RAM: "8G",
            OS: "Ubuntu",
            OS_Version: "16.04 LTS",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 131.67,
            test2: 91.03,
            test3: 130.33,
            test4: 321.17,
            test5: 217,
            test6: 1491.37,
            total: 2382.57
          },
          {
            Type: "Desktop",
            Model: "Dell XPS P82G",
            CPU: "i5-8250U",
            GPU: "UHD 620",
            RAM: "8G",
            OS: "Ubuntu",
            OS_Version: "16.04 LTS",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            BackendNative: "",
            test1: 9.97,
            test2: 10,
            test3: 6.47,
            test4: 21,
            test5: 14.33,
            test6: 53.97,
            total: 115.74
          },
                    {
            Type: "Laptop",
            Model: "Macbook Pro",
            CPU: "i7-4770HQ",
            GPU: "Iris Pro 1.5G",
            RAM: "16G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            BackendNative: "MPS",
            test1: 475.87,
            test2: 318.47,
            test3: 281.03,
            test4: 984.37,
            test5: 826.33,
            test6: 4048.83,
            total: 6934.9
          },
          {
            Type: "Laptop",
            Model: "Macbook Pro",
            CPU: "i7-4770HQ",
            GPU: "Iris Pro 1.5G",
            RAM: "16G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            BackendNative: "MPS",
            test1: 106.6,
            test2: 83.63,
            test3: 106.53,
            test4: 260.3,
            test5: 156.93,
            test6: 1065.03,
            total: 1779.02
          },
          {
            Type: "Laptop",
            Model: "Macbook Pro",
            CPU: "i7-4770HQ",
            GPU: "Iris Pro 1.5G",
            RAM: "16G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            BackendNative: "MPS",
            test1: 17.9,
            test2: 21.67,
            test3: 13.83,
            test4: 34.83,
            test5: 19.6,
            test6: 81.1,
            total: 188.93
          },
          {
            Type: "Laptop",
            Model: "Macbook Pro",
            CPU: "i7-4770HQ",
            GPU: "Iris Pro 1.5G",
            RAM: "16G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70_b7ce158",
            Backend: "WASM",
            BackendNative: "BNNS",
            test1: 491.77,
            test2: 323.57,
            test3: 287,
            test4: 1013.3,
            test5: 838.17,
            test6: 4123.1,
            total: 7076.91
          },
          {
            Type: "Laptop",
            Model: "Macbook Pro",
            CPU: "i7-4770HQ",
            GPU: "Iris Pro 1.5G",
            RAM: "16G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70_b7ce158",
            Backend: "WebGL2",
            BackendNative: "BNNS",
            test1: 106.5,
            test2: 74.8,
            test3: 94.1,
            test4: 266.2,
            test5: 153.47,
            test6: 170.97,
            total: 866.04
          },
          {
            Type: "Laptop",
            Model: "Macbook Pro",
            CPU: "i7-4770HQ",
            GPU: "Iris Pro 1.5G",
            RAM: "16G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70_b7ce158",
            Backend: "WebML",
            BackendNative: "BNNS",
            test1: "N/A",
            test2: "N/A",
            test3: 8.20,
            test4: "N/A",
            test5: "N/A",
            test6: 86.47,
            total: 0
          }
        ]
      };
    }
  };
</script>

<style scoped>
  .title {
    font-weight: 200;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .tooltip:after {
    border-radius: 0px;
  }
  
  .tooltip.is-primary:after {
    background-color: rgba(222, 12, 101, 0.9);
  }
  
  .blank {
    height: 1rem;
  }
  
  .cap {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
  }
  .cap svg {
    margin-right: 0.2rem;
  }

  .svg-inline--fa {
    width: 20px;
    height: 20px;
  }
</style>