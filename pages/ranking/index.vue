<template>
  <div class="container">
    <ai_nav/>
    <section class="section hero">
      <h2 class="has-text-primary is-size-5-desktop is-size-6-mobile is-size-5-tablet mb ic">Performance Ranking</h2>
      <b-tabs>
        <b-tab-item label="Desktops" icon="desktop-mac">
  
          <div class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class='cap'><i class="mdi mdi-windows mdi-24px"></i> Windows 10 Desktop</div>
              <div class='ic mb blank'></div>
  
              <b-tabs type="is-toggle" position="is-centered" class="block" size="is-small">
                <b-tab-item label="WebML">
  
                  <div class='columns mb'>
                    <div class="column is-mobile is-12 ic">
                      <div class="mb mt ir">
                        <b-table :data="ranking" :default-sort-direction="defaultSortDirection" default-sort="total" :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
                          <template slot-scope="props" v-if='props.row.Backend == "WebML" && props.row.OS == "Windows"'>
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
          
                              <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
                                  N/A
                              </b-table-column> 
                              <b-table-column v-else field="total" label="Total (ms)" sortable>
                                  <b-tooltip v-if="getFast('Windows','WebML') == props.row.total" label="Best" always>
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
          <b-tab-item label="WASM">
            <div class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class="mb mt ir">
                <b-table :data="ranking" 
                :default-sort-direction="defaultSortDirection"
                default-sort="total"
                :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
<template slot-scope="props" v-if='props.row.Backend == "WASM" && props.row.OS == "Windows"'>
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
  
  <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
    N/A
  </b-table-column>
  <b-table-column v-else field="total" label="Total (ms)" sortable>
    <b-tooltip v-if="getFast('Windows','WASM') == props.row.total" label="Best" always>
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
            <b-tab-item label="WebGL2">
                      <div class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class="mb mt ir">
                <b-table :data="ranking" 
                :default-sort-direction="defaultSortDirection"
                default-sort="total"
                :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
<template slot-scope="props" v-if='props.row.Backend == "WebGL2" && props.row.OS == "Windows"'>
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
  
  <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
    N/A
  </b-table-column>
  <b-table-column v-else field="total" label="Total (ms)" sortable>
    <b-tooltip v-if="getFast('Windows','WebGL2') == props.row.total" label="Best" always>
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

        <div class='columns mb'>
          <div class="column is-mobile is-12 ic">
          <div class='cap'><i class="mdi mdi-apple mdi-24px"></i> Mac Desktop</div>
          <div class='ic mb blank'></div>
         <b-tabs type="is-toggle" position="is-centered" class="block" size="is-small">
            <b-tab-item label="WebML">
            
          <div class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class="mb mt ir">
                <b-table :data="ranking" 
                :default-sort-direction="defaultSortDirection"
                default-sort="total"
                :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
<template slot-scope="props" v-if='props.row.Backend == "WebML" && props.row.OS == "Mac OS"'>
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
    {{ props.row.OS_Version }}
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
  
  <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
    N/A
  </b-table-column>
  <b-table-column v-else field="total" label="Total (ms)" sortable>
    <b-tooltip v-if="getFast('Mac OS','WebML') == props.row.total" label="Best" always>
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
          <b-tab-item label="WASM">
            <div class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class="mb mt ir">
                <b-table :data="ranking" 
                :default-sort-direction="defaultSortDirection"
                default-sort="total"
                :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
<template slot-scope="props" v-if='props.row.Backend == "WASM" && props.row.OS == "Mac OS"'>
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
    {{ props.row.OS_Version }}
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
  
  <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
    N/A
  </b-table-column>
  <b-table-column v-else field="total" label="Total (ms)" sortable>
    <b-tooltip v-if="getFast('Mac OS','WASM') == props.row.total" label="Best" always>
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
            <b-tab-item label="WebGL2">
                      <div class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class="mb mt ir">
                <b-table :data="ranking" 
                :default-sort-direction="defaultSortDirection"
                default-sort="total"
                :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
<template slot-scope="props" v-if='props.row.Backend == "WebGL2" && props.row.OS == "Mac OS"'>
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
    {{ props.row.OS_Version }}
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
  
  <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
    N/A
  </b-table-column>
  <b-table-column v-else field="total" label="Total (ms)" sortable>
    <b-tooltip v-if="getFast('Mac OS','WebGL2') == props.row.total" label="Best" always>
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

        <div class='columns mb'>
          <div class="column is-mobile is-12 ic">
          <div class='cap'><i class="mdi mdi-ubuntu mdi-24px"></i> Linux Desktop</div>
          <div class='ic mb blank'></div>
        <b-tabs type="is-toggle" position="is-centered" class="block" size="is-small">
            <b-tab-item label="WebML">
            
          <div class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class="mb mt ir">
                <b-table :data="ranking" 
                :default-sort-direction="defaultSortDirection"
                default-sort="total"
                :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
<template slot-scope="props" v-if='props.row.Backend == "WebML" && props.row.OS == "Ubuntu"'>
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
    {{ props.row.OS_Version }}
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
  
  <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
    N/A
  </b-table-column>
  <b-table-column v-else field="total" label="Total (ms)" sortable>
    <b-tooltip v-if="getFast('Ubuntu','WebML') == props.row.total" label="Best" always>
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
          <b-tab-item label="WASM">
            <div class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class="mb mt ir">
                <b-table :data="ranking" 
                :default-sort-direction="defaultSortDirection"
                default-sort="total"
                :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
<template slot-scope="props" v-if='props.row.Backend == "WASM" && props.row.OS == "Ubuntu"'>
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
    {{ props.row.OS_Version }}
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
  
  <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
    N/A
  </b-table-column>
  <b-table-column v-else field="total" label="Total (ms)" sortable>
    <b-tooltip v-if="getFast('Ubuntu','WASM') == props.row.total" label="Best" always>
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
            <b-tab-item label="WebGL2">
                      <div class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class="mb mt ir">
                <b-table :data="ranking" 
                :default-sort-direction="defaultSortDirection"
                default-sort="total"
                :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
<template slot-scope="props" v-if='props.row.Backend == "WebGL2" && props.row.OS == "Ubuntu"'>
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
    {{ props.row.OS_Version }}
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
  
  <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
    N/A
  </b-table-column>
  <b-table-column v-else field="total" label="Total (ms)" sortable>
    <b-tooltip v-if="getFast('Ubuntu','WebGL2') == props.row.total" label="Best" always>
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

            <div class='ic mb'>
            <div class='cap'><i class="mdi mdi-android mdi-24px"></i> Android Phone</div></div>
            <div class='ic mb blank'></div>

        <b-tabs type="is-toggle" position="is-centered" class="block" size="is-small">
            <b-tab-item label="WebML">
            
          <div class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class="mb mt ir">
                <b-table :data="ranking" 
                :default-sort-direction="defaultSortDirection"
                default-sort="total"
                :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
<template slot-scope="props" v-if='props.row.Backend == "WebML" && props.row.OS == "Android"'>
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
    {{ props.row.OS_Version }}
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
  
  <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
    N/A
  </b-table-column>
  <b-table-column v-else field="total" label="Total (ms)" sortable>
    <b-tooltip v-if="getFast('Android','WebML') == props.row.total" label="Best" always>
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
          <b-tab-item label="WASM">
            <div class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class="mb mt ir">
                <b-table :data="ranking" 
                :default-sort-direction="defaultSortDirection"
                default-sort="total"
                :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
<template slot-scope="props" v-if='props.row.Backend == "WASM" && props.row.OS == "Android"'>
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
    {{ props.row.OS_Version }}
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
  
  <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
    N/A
  </b-table-column>
  <b-table-column v-else field="total" label="Total (ms)" sortable>
    <b-tooltip v-if="getFast('Android','WASM') == props.row.total" label="Best" always>
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
            <b-tab-item label="WebGL2">
                      <div class='columns mb'>
            <div class="column is-mobile is-12 ic">
              <div class="mb mt ir">
                <b-table :data="ranking" 
                :default-sort-direction="defaultSortDirection"
                default-sort="total"
                :bordered="false" :striped="true" :narrowed="false" :hoverable="true" :loading="false" :focusable="true" :mobile-cards="true">
<template slot-scope="props" v-if='props.row.Backend == "WebGL2" && props.row.OS == "Android"'>
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
    {{ props.row.OS_Version }}
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
  
  <b-table-column v-if="props.row.total == 0" field="total" label="Total (ms)" sortable>
    N/A
  </b-table-column>
  <b-table-column v-else field="total" label="Total (ms)" sortable>
    <b-tooltip v-if="getFast('Android','WebGL2') == props.row.total" label="Best" always>
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
      total() {
        let total = 0;
        this.ranking.map(item => {
          console.log(item.test1);
          if (item.OS == "Windows") {
            total =
              item.test1 + item.test2 + item.test4 + item.test3 + item.test5;
          }
        });
        return total;
      }
    },
    data() {
      return {
        // isPaginated: true,
        // isPaginationSimple: false,
        defaultSortDirection: "asc",
        // currentPage: 1,
        // perPage: 30,
        ranking: [{
            Id: '004',
            Type: "Laptop",
            Model: "Dell XPS 13-9360",
            CPU: "i5-8250U",
            GPU: "UHD 620",
            RAM: "8G",
            OS: "Windows",
            OS_Version: "10 1803 17134.286",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 492.2,
            test2: 318.3,
            test4: 1034.63,
            test3: 295.13,
            test5: 855.63,
            total: 2995.89
          },
          {
            Id: '004',
            Type: "Laptop",
            Model: "Dell XPS 13-9360",
            CPU: "i5-8250U",
            GPU: "UHD 620",
            RAM: "8G",
            OS: "Windows",
            OS_Version: "10 1803 17134.286",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 181.3,
            test2: 107.5,
            test4: 386.53,
            test3: 136.13,
            test5: 232.73,
            total: 1044.19
          },
          {
            Id: '004',
            Type: "Laptop",
            Model: "Dell XPS 13-9360",
            CPU: "i5-8250U",
            GPU: "UHD 620",
            RAM: "8G",
            OS: "Windows",
            OS_Version: "10 1803 17134.286",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 13.13,
            test2: 13.1,
            test4: 24.17,
            test3: 7.23,
            test5: 15.57,
            total: 73.20
          },
          {
            Id: '005',
            Type: "Laptop",
            Model: "Dell Inspiron 13-7359",
            CPU: "i5-6200U",
            GPU: "HD 520",
            RAM: "4G",
            OS: "Windows",
            OS_Version: "10 1709 16299.371",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 1265.6,
            test2: 841.4,
            test4: 2239.77,
            test3: 686,
            test5: 2097.8,
            total: 7130.57
          },
          {
            Id: '005',
            Type: "Laptop",
            Model: "Dell Inspiron 13-7359",
            CPU: "i5-6200U",
            GPU: "HD 520",
            RAM: "4G",
            OS: "Windows",
            OS_Version: "10 1709 16299.371",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 439.93,
            test2: 307.1,
            test4: 1276.8,
            test3: 452.03,
            test5: 716,
            total: 3191.86
          },
          {
            Id: '005',
            Type: "Laptop",
            Model: "Dell Inspiron 13-7359",
            CPU: "i5-6200U",
            GPU: "HD 520",
            RAM: "4G",
            OS: "Windows",
            OS_Version: "10 1709 16299.371",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 36.37,
            test2: 37.63,
            test4: 81.33,
            test3: 18.63,
            test5: 55.93,
            total: 229.89
          },
          {
            Id: '001',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-8700K",
            GPU: "UHD 630",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 376.8,
            test2: 237.93,
            test4: 782.8,
            test3: 221.63,
            test5: 655.33,
            total: 2274.49
          },
          {
            Id: '001',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-8700K",
            GPU: "UHD 630",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 164.13,
            test2: 75.6,
            test4: 310.7,
            test3: 104.37,
            test5: 223.57,
            total: 878.37
          },
          {
            Id: '001',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-8700K",
            GPU: "UHD 630",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 9.23,
            test2: 9.4,
            test4: 19.47,
            test3: 5.73,
            test5: 13.73,
            total: 57.56
          },
          {
            Id: '006',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-8700K",
            GPU: "GTX 1080",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 375.4,
            test2: 243.9,
            test4: 793.43,
            test3: 225.83,
            test5: 645.43,
            total: 2283.99
          },
          {
            Id: '006',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-8700K",
            GPU: "GTX 1080",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 37.53,
            test2: 33.37,
            test4: 152.53,
            test3: 39.03,
            test5: 60.87,
            total: 323.33
          },
          {
            Id: '006',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-8700K",
            GPU: "GTX 1080",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 0,
            test2: 0,
            test4: 0,
            test3: 0,
            test5: 0,
            total: 0
          },
          {
            Id: '008',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-7700",
            GPU: "HD 630",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1709 16299.661",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 409.43,
            test2: 263.43,
            test4: 873.33,
            test3: 242.37,
            test5: 721.8,
            total: 2510.36
          },
          {
            Id: '008',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-7700",
            GPU: "HD 630",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1709 16299.661",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 127.4,
            test2: 104.13,
            test4: 319.3,
            test3: 168.8,
            test5: 219.13,
            total: 938.76
          },
          {
            Id: '008',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-7700",
            GPU: "HD 630",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1709 16299.661",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 0,
            test2: 12.6,
            test4: 0,
            test3: 6.7,
            test5: 0,
            total: 0
          },
          {
            Id: '003',
            Type: "Desktop",
            Model: "PC",
            CPU: "i3-7100",
            GPU: "HD 630",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 432.3,
            test2: 274.57,
            test4: 933.1,
            test3: 267.83,
            test5: 756.17,
            total: 2663.97
          },
          {
            Id: '003',
            Type: "Desktop",
            Model: "PC",
            CPU: "i3-7100",
            GPU: "HD 630",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 186.47,
            test2: 110.3,
            test4: 392.6,
            test3: 146.23,
            test5: 243.13,
            total: 1078.73
          },
          {
            Id: '003',
            Type: "Desktop",
            Model: "PC",
            CPU: "i3-7100",
            GPU: "HD 630",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 10.17,
            test2: 10.3,
            test4: 21.8,
            test3: 5.8,
            test5: 14.8,
            total: 62.87
          },
          {
            Id: '009',
            Type: "Desktop",
            Model: "PC",
            CPU: "i3-7100",
            GPU: "GTX 1080",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 437.37,
            test2: 275.6,
            test4: 906.7,
            test3: 256.63,
            test5: 741.43,
            total: 2617.73
          },
          {
            Id: '009',
            Type: "Desktop",
            Model: "PC",
            CPU: "i3-7100",
            GPU: "GTX 1080",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 39.07,
            test2: 35.17,
            test4: 119.53,
            test3: 39.07,
            test5: 68.47,
            total: 301.31
          },
          {
            Id: '009',
            Type: "Desktop",
            Model: "PC",
            CPU: "i3-7100",
            GPU: "GTX 1080",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 0,
            test2: 0,
            test4: 0,
            test3: 0,
            test5: 0,
            total: 0
          },
          {
            Id: '009',
            Id: '002',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-6700K",
            GPU: "HD 530",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 413.63,
            test2: 265.07,
            test4: 854.13,
            test3: 244.97,
            test5: 704.87,
            total: 2482.67
          },
          {
            Id: '002',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-6700K",
            GPU: "HD 530",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 167.87,
            test2: 98.5,
            test4: 373.87,
            test3: 133.53,
            test5: 222.07,
            total: 995.84
          },
          {
            Id: '002',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-6700K",
            GPU: "HD 530",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 9.83,
            test2: 11.1,
            test4: 20.17,
            test3: 5.63,
            test5: 15.47,
            total: 62.20
          },
          {
            Id: '007',
            Type: "Desktop",
            Model: "PC",
            CPU: "Ryzen 7 2700X",
            GPU: "GTX 1080",
            RAM: "16G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 386.63,
            test2: 260.63,
            test4: 776.63,
            test3: 221.87,
            test5: 650.1,
            total: 2295.86
          },
          {
            Id: '007',
            Type: "Desktop",
            Model: "PC",
            CPU: "Ryzen 7 2700X",
            GPU: "GTX 1080",
            RAM: "16G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 40.17,
            test2: 38.2,
            test4: 184.77,
            test3: 40.63,
            test5: 68.7,
            total: 372.47
          },
          {
            Id: '007',
            Type: "Desktop",
            Model: "PC",
            CPU: "Ryzen 7 2700X",
            GPU: "GTX 1080",
            RAM: "16G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 0,
            test2: 0,
            test4: 0,
            test3: 0,
            test5: 0,
            total: 0
          },
          {
            Id: '010',
            Type: "Desktop",
            Model: "PC",
            CPU: "Ryzen 7 1800X",
            GPU: "GTX 1080",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 428.17,
            test2: 284.2,
            test4: 909.8,
            test3: 255.53,
            test5: 741.43,
            total: 2619.13
          },
          {
            Id: '010',
            Type: "Desktop",
            Model: "PC",
            CPU: "Ryzen 7 1800X",
            GPU: "GTX 1080",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 42.7,
            test2: 40.37,
            test4: 127.47,
            test3: 43.63,
            test5: 72.3,
            total: 326.47
          },
          {
            Id: '010',
            Type: "Desktop",
            Model: "PC",
            CPU: "Ryzen 7 1800X",
            GPU: "GTX 1080",
            RAM: "32G",
            OS: "Windows",
            OS_Version: "10 1803 17134.320",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 0,
            test2: 0,
            test4: 0,
            test3: 0,
            test5: 0,
            total: 0
          },
          {
            Id: '003',
            Type: "Phone",
            Model: "Google Pixel 2 G011A",
            CPU: "Snapdragon 835",
            GPU: "Adreno 540",
            RAM: "4G",
            OS: "Android",
            OS_Version: "8.1.0",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 1584.77,
            test2: 1050.37,
            test4: 3326.27,
            test3: 927.87,
            test5: 2764.63,
            total: 9653.91
          },
          {
            Id: '003',
            Type: "Phone",
            Model: "Google Pixel 2 G011A",
            CPU: "Snapdragon 835",
            GPU: "Adreno 540",
            RAM: "4G",
            OS: "Android",
            OS_Version: "8.1.0",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 275.57,
            test2: 221,
            test4: 142.3,
            test3: 242.43,
            test5: 390.47,
            total: 1271.77
          },
          {
            Id: '003',
            Type: "Phone",
            Model: "Google Pixel 2 G011A",
            CPU: "Snapdragon 835",
            GPU: "Adreno 540",
            RAM: "4G",
            OS: "Android",
            OS_Version: "8.1.0",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 247.97,
            test2: 166.33,
            test4: 453.3,
            test3: 130.9,
            test5: 379.67,
            total: 1378.17
          },
          {
            Id: '002',
            Type: "Phone",
            Model: "Google Pixel 2 XL G011C",
            CPU: "Snapdragon 835",
            GPU: "Adreno 540",
            RAM: "4G",
            OS: "Android",
            OS_Version: "9",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 2117,
            test2: 1403.7,
            test4: 4472.8,
            test3: 1140.2,
            test5: 2824.87,
            total: 11958.57
          },
          {
            Id: '002',
            Type: "Phone",
            Model: "Google Pixel 2 XL G011C",
            CPU: "Snapdragon 835",
            GPU: "Adreno 540",
            RAM: "4G",
            OS: "Android",
            OS_Version: "9",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 269.83,
            test2: 226.97,
            test4: 181.9,
            test3: 239.07,
            test5: 389.3,
            total: 1307.07
          },
          {
            Id: '002',
            Type: "Phone",
            Model: "Google Pixel 2 XL G011C",
            CPU: "Snapdragon 835",
            GPU: "Adreno 540",
            RAM: "4G",
            OS: "Android",
            OS_Version: "9",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 147.37,
            test2: 135.33,
            test4: 245.5,
            test3: 56.93,
            test5: 146.33,
            total: 731.46
          },
          {
            Id: '001',
            Type: "Phone",
            Model: "Huawei P20 Pro CLT-AL01",
            CPU: "HiSilicon Kirin 970",
            GPU: "Mali-G72",
            RAM: "6G",
            OS: "Android",
            OS_Version: "8.1.0",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 1596.63,
            test2: 1054.9,
            test4: 3383.87,
            test3: 926.3,
            test5: 2793.87,
            total: 9755.57
          },
          {
            Id: '001',
            Model: "Huawei P20 Pro CLT-AL01",
            CPU: "HiSilicon Kirin 970",
            GPU: "Mali-G72",
            RAM: "6G",
            OS: "Android",
            OS_Version: "8.1.0",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 461.37,
            test2: 301.37,
            test4: 147.07,
            test3: 455.4,
            test5: 712.63,
            total: 2077.87
          },
          {
            Id: '001',
            Type: "Phone",
            Model: "Huawei P20 Pro CLT-AL01",
            CPU: "HiSilicon Kirin 970",
            GPU: "Mali-G72",
            RAM: "6G",
            OS: "Android",
            OS_Version: "8.1.0",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 76.8,
            test2: 80,
            test4: 118.2,
            test3: 54.63,
            test5: 109.1,
            total: 438.73
          },
          // {
          //   Id: '004',
          //   Type: "NUC",
          //   Model: "Nuc",
          //   CPU: "i5-7260U",
          //   GPU: "Iris Plus 640",
          //   RAM: "8G",
          //   OS: "Android",
          //   OS_Version: "8.1.0",
          //   Chromium: "70.0.3503.0",
          //   Backend: "WASM", BackendNative: "",
          //   test1: 510.8,
          //   test2: 350.03,
          //   test4: 1038.7,
          //   test3: 297.63,
          //   test5: 856.6,
          //   total: 3053.76
          // },
          // {
          //   Id: '004',
          //   Type: "NUC",
          //   Model: "Nuc",
          //   CPU: "i5-7260U",
          //   GPU: "Iris Plus 640",
          //   RAM: "8G",
          //   OS: "Android",
          //   OS_Version: "8.1.0",
          //   Chromium: "70.0.3503.0",
          //   Backend: "WebGL2", BackendNative: "",
          //   test1: 95.7,
          //   test2: 70.43,
          //   test4: 274.63,
          //   test3: 95.73,
          //   test5: 154.43,
          //   total: 690.92
          // },
          // {
          //   Id: '004',
          //   Type: "NUC",
          //   Model: "Nuc",
          //   CPU: "i5-7260U",
          //   GPU: "Iris Plus 640",
          //   RAM: "8G",
          //   OS: "Android",
          //   OS_Version: "8.1.0",
          //   Chromium: "70.0.3503.0",
          //   Backend: "WebML", BackendNative: "",
          //   test1: 58.63,
          //   test2: 62.3,
          //   test4: 114.73,
          //   test3: 15.07,
          //   test5: 94.23,
          //   total: 344.96
          // },
  
  
  
          {
            Id: '002',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-6700",
            GPU: "HD 530 GT2",
            RAM: "12G",
            OS: "Ubuntu",
            OS_Version: "16.04 LTS",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 360.97,
            test2: 228.47,
            test4: 762.97,
            test3: 220.50,
            test5: 630.83,
            total: 2203.74
          },
          {
            Id: '002',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-6700",
            GPU: "HD 530 GT2",
            RAM: "12G",
            OS: "Ubuntu",
            OS_Version: "16.04 LTS",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 129.43,
            test2: 98.03,
            test4: 347.7,
            test3: 127.93,
            test5: 214.33,
            total: 917.42
          },
          {
            Id: '002',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-6700",
            GPU: "HD 530 GT2",
            RAM: "12G",
            OS: "Ubuntu",
            OS_Version: "16.04 LTS",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 10.63,
            test2: 15.33,
            test4: 20.13,
            test3: 5.80,
            test5: 14.37,
            total: 66.26
          },
  
          {
            Id: '001',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-7700K",
            GPU: "HD 630 GT2",
            RAM: "32G",
            OS: "Ubuntu",
            OS_Version: "16.04 LTS",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "",
            test1: 329.53,
            test2: 210.17,
            test4: 690.27,
            test3: 201.17,
            test5: 567.47,
            total: 1998.61
          },
          {
            Id: '001',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-7700K",
            GPU: "HD 630 GT2",
            RAM: "32G",
            OS: "Ubuntu",
            OS_Version: "16.04 LTS",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "",
            test1: 112.03,
            test2: 89.93,
            test4: 307.87,
            test3: 120.93,
            test5: 203.9,
            total: 834.66
          },
          {
            Id: '001',
            Type: "Desktop",
            Model: "PC",
            CPU: "i7-7700K",
            GPU: "HD 630 GT2",
            RAM: "32G",
            OS: "Ubuntu",
            OS_Version: "16.04 LTS",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "",
            test1: 11.23,
            test2: 9.97,
            test4: 20.53,
            test3: 5.93,
            test5: 15,
            total: 62.66
          },
  
  
  
          {
            Id: '001',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "MPS",
            test1: 506.57,
            test2: 332.67,
            test4: 1056.23,
            test3: 299.6,
            test5: 893.9,
            total: 3088.97
          },
          {
            Id: '001',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "MPS",
            test1: 94.87,
            test2: 63.3,
            test4: 300.23,
            test3: 97.23,
            test5: 155.97,
            total: 711.60
          },
          {
            Id: '001',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "MPS",
            test1: 24.2,
            test2: 0,
            test4: 40.9,
            test3: 13.03,
            test5: 28.33,
            total: 0
          },
          {
            Id: '002',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.14",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "MPS",
            test1: 504.67,
            test2: 332.6,
            test4: 1058.27,
            test3: 294.63,
            test5: 872.1,
            total: 3062.27
          },
          {
            Id: '002',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.14",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "MPS",
            test1: 91.13,
            test2: 82.77,
            test4: 301.07,
            test3: 99.03,
            test5: 145.67,
            total: 729.67
          },
          {
            Id: '002',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.14",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "MPS",
            test1: 24,
            test2: 0,
            test4: 39.77,
            test3: 12.4,
            test5: 27.47,
            total: 0
          },
          {
            Id: '001',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "BNNS",
            test1: 509.2,
            test2: 337.07,
            test4: 1055.93,
            test3: 303.1,
            test5: 876.63,
            total: 3081.93
          },
          {
            Id: '001',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "BNNS",
            test1: 84.63,
            test2: 70.17,
            test4: 291.83,
            test3: 90.03,
            test5: 149.77,
            total: 686.43
          },
          {
            Id: '001',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "BNNS",
            test1: 0,
            test2: 0,
            test4: 0,
            test3: 13.77,
            test5: 0,
            total: 0
          },
          {
            Id: '002',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.14",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "BNNS",
            test1: 507.1,
            test2: 334.5,
            test4: 1059,
            test3: 295.63,
            test5: 873.63,
            total: 3069.86
          },
          {
            Id: '002',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.14",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "BNNS",
            test1: 84.77,
            test2: 63.9,
            test4: 287.4,
            test3: 85.1,
            test5: 143.2,
            total: 664.37
          },
          {
            Id: '002',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-5257U",
            GPU: "Iris Craphics 6100",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.14",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "BNNS",
            test1: 0,
            test2: 0,
            test4: 0,
            test3: 12.13,
            test5: 0,
            total: 0
          },
  
          {
            Id: '003',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-7267U",
            GPU: "Iris Plus Craphics 650",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "MPS",
            test1: 477.10,
            test2: 321.47,
            test4: 1016.40,
            test3: 289.97,
            test5: 846.70,
            total: 2951.64
          },
          {
            Id: '003',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-7267U",
            GPU: "Iris Plus Craphics 650",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "MPS",
            test1: 105.20,
            test2: 81.73,
            test4: 307.37,
            test3: 114.70,
            test5: 172.03,
            total: 781.03
          },
          {
            Id: '003',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-7267U",
            GPU: "Iris Plus Craphics 650",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "MPS",
            test1: 21.90,
            test2: 0,
            test4: 31.37,
            test3: 11.57,
            test5: 17.93,
            total: 0
          },
          {
            Id: '003',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-7267U",
            GPU: "Iris Plus Craphics 650",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70.0.3503.0",
            Backend: "WASM",
            BackendNative: "BNNS",
            test1: 480.40,
            test2: 320.40,
            test4: 1024.20,
            test3: 306.30,
            test5: 834.47,
            total: 2965.77
          },
          {
            Id: '003',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-7267U",
            GPU: "Iris Plus Craphics 650",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70.0.3503.0",
            Backend: "WebGL2",
            BackendNative: "BNNS",
            test1: 104.23,
            test2: 80.27,
            test4: 313.70,
            test3: 109.47,
            test5: 167.10,
            total: 774.77
          },
          {
            Id: '003',
            Type: "Laptop",
            Model: "MacBook Pro",
            CPU: "i5-7267U",
            GPU: "Iris Plus Craphics 650",
            RAM: "8G",
            OS: "Mac OS",
            OS_Version: "10.13.6",
            Chromium: "70.0.3503.0",
            Backend: "WebML",
            BackendNative: "BNNS",
            test1: 0,
            test2: 0,
            test4: 0,
            test3: 10.50,
            test5: 0,
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
</style>