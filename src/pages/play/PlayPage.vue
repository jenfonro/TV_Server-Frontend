<template>
  <main
    id="playPage"
    class="content-main flex-1 md:min-h-0 md:mt-0"
    style="padding-top:var(--tv-topbar-h, calc(3rem + env(safe-area-inset-top)));padding-bottom:calc(3.5rem + env(safe-area-inset-bottom))"
  >
          <div class="flex flex-col gap-3 py-4 px-5 lg:px-[3rem] 2xl:px-20">
            <div class="py-1">
              <div class="flex items-center gap-3">
                <button
                  type="button"
                  class="tv-icon-btn"
                  aria-label="返回"
                  @click="exitPlay"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </button>
                <div class="flex flex-1 items-center gap-2 min-w-0">
                  <h1 class="min-w-0 text-xl font-semibold text-gray-900 dark:text-gray-100">
                    <span id="playTitle" class="block truncate">{{ topLeftTitle }}</span>
                  </h1>
                  <button
                    type="button"
                    class="tv-icon-btn flex-shrink-0"
                    :class="isFavorited ? 'text-pink-600 dark:text-pink-400 border-pink-200/60 dark:border-pink-500/30' : ''"
                    :disabled="favoriteLoading || !canFavorite"
                    aria-label="收藏/取消收藏"
                    @click="toggleFavorite"
                  >
                    <svg
                      v-if="isFavorited"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="w-4 h-4"
                      fill="none"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="tvFavGradTop" x1="2" y1="4" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stop-color="#fb7185" />
                          <stop offset="0.55" stop-color="#ec4899" />
                          <stop offset="1" stop-color="#a855f7" />
                        </linearGradient>
                      </defs>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        fill="url(#tvFavGradTop)"
                        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-1.344-.728 25.18 25.18 0 0 1-3.67-3.295 24.257 24.257 0 0 1-3.168-4.269c-.63-1.001-.839-2.145-.73-3.253.108-1.108.532-2.166 1.235-3.048a4.793 4.793 0 0 1 3.462-1.795c1.567-.08 3.113.582 4.084 1.816.97-1.234 2.517-1.896 4.084-1.816a4.793 4.793 0 0 1 3.462 1.795c.703.882 1.127 1.94 1.235 3.048.109 1.108-.1 2.252-.73 3.253a24.257 24.257 0 0 1-3.168 4.269 25.18 25.18 0 0 1-3.67 3.295 15.247 15.247 0 0 1-1.344.728l-.022.012-.007.003a.752.752 0 0 1-.704 0Z"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="w-4 h-4 text-slate-400 dark:text-slate-300"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <div class="hidden lg:flex justify-end">
                <button id="episodePanelToggle" class="group relative flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-200" type="button" title="隐藏选集面板">
                  <svg id="episodePanelToggleIcon" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform duration-200 rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  <span id="episodePanelToggleLabel" class="text-xs font-medium text-gray-600 dark:text-gray-300">隐藏</span>
                  <div id="episodePanelToggleDot" class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full transition-all duration-200 bg-green-400"></div>
                </button>
              </div>

	              <div id="playGrid" class="grid gap-4 transition-all duration-300 ease-in-out grid-cols-1 md:grid-cols-4">
	                <div id="playerArea" class="transition-all duration-300 ease-in-out rounded-xl border border-white/0 dark:border-white/30 md:col-span-3">
                    <div class="tv-player-stack flex flex-col gap-2">
	                    <div class="play-video-ratio rounded-xl overflow-hidden shadow-lg">
		                      <div class="play-video-ratio__inner">
			                        <ArtPlayer
                              ref="artPlayerRef"
			                          :url="playerUrl"
			                          :headers="playerHeaders"
			                          :title="displayTitle"
			                          :autoplay="true"
                              :go-proxy-options="goProxyUiOptions"
                              :go-proxy-selected-base="goProxyManualBase"
                              :go-proxy-label="goProxyUiLabel"
                              :show-buffer-ring="playerPhase === 'buffering'"
			                          @loadedmetadata="onPlayerLoadedMetadata"
                              @buffering="onPlayerBuffering"
                              @playing="onPlayerPlaying"
                              @firstframe="onPlayerFirstFrame"
                              @error="onPlayerError"
                              @goproxyselect="onGoProxySelect"
			                        />
	                      <div
	                        v-show="playerPhase !== 'ready' && playerPhase !== 'buffering'"
	                        class="play-player-overlay"
	                        :class="{ 'play-player-overlay--error': playerPhase === 'error' }"
	                      >
	                        <div class="play-player-overlay__panel" :style="{ '--play-stage-p': playerStageProgress }">
	                              <div class="play-player-overlay__mark" aria-hidden="true">
	                                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision">
                                <defs>
                                  <linearGradient id="playPaw" x1="360" y1="380" x2="720" y2="720" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-color="#00ADD8"/>
                                    <stop offset="0.55" stop-color="#42B883"/>
                                    <stop offset="1" stop-color="#646CFF"/>
                                  </linearGradient>
                                  <linearGradient id="playScreen" x1="330" y1="350" x2="740" y2="710" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-color="#1E293B"/>
                                    <stop offset="1" stop-color="#334155"/>
                                  </linearGradient>
                                  <radialGradient id="playScreenShine" cx="30%" cy="22%" r="75%">
                                    <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.14"/>
                                    <stop offset="0.45" stop-color="#FFFFFF" stop-opacity="0.04"/>
                                    <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
                                  </radialGradient>
                                </defs>

                                <g>
                                  <rect x="184" y="262" width="656" height="468" rx="164" fill="#E5E7EB" fill-opacity="0.34" stroke="#FFFFFF" stroke-opacity="0.10" stroke-width="10"/>
                                  <rect x="204" y="282" width="616" height="428" rx="152" fill="#E5E7EB" fill-opacity="0.18" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="10"/>
                                  <rect x="244" y="322" width="536" height="348" rx="132" fill="url(#playScreen)"/>
                                  <rect x="244" y="322" width="536" height="348" rx="132" fill="url(#playScreenShine)"/>
                                  <rect x="252" y="330" width="520" height="332" rx="124" fill="none" stroke="#FFFFFF" stroke-opacity="0.09" stroke-width="10"/>

                                  <path d="M440 746 C468 792 556 792 584 746" fill="none" stroke="#E5E7EB" stroke-width="34" stroke-linecap="round" opacity="0.82"/>
                                  <path d="M372 810 H652" fill="none" stroke="#E5E7EB" stroke-width="34" stroke-linecap="round" opacity="0.42"/>
                                </g>

                                <g>
                                  <circle cx="410" cy="452" r="32" fill="url(#playPaw)"/>
                                  <circle cx="476" cy="418" r="36" fill="url(#playPaw)"/>
                                  <circle cx="548" cy="418" r="36" fill="url(#playPaw)"/>
                                  <circle cx="614" cy="452" r="32" fill="url(#playPaw)"/>
                                  <path d="M512 476 C448 476 396 526 396 596 C396 670 456 724 512 724 C568 724 628 670 628 596 C628 526 576 476 512 476 Z" fill="url(#playPaw)"/>
                                  <path d="M491 576 L491 658 L571 617 Z" fill="#FFFFFF" opacity="0.95"/>
                                </g>
	                              </svg>
	                              </div>

                            <div class="play-player-overlay__text">
                              <div class="play-player-overlay__status">
                                <div class="play-player-overlay__statusText">{{ playerPhaseText }}</div>
                                <div v-if="playerPhaseLoading" class="tv-spinner play-player-overlay__spinner" aria-hidden="true"></div>
                              </div>
                            </div>

                            <div
                              class="play-player-overlay__progress"
                              role="progressbar"
                              :aria-label="`加载进度：${Math.round(playerStageProgress * 100)}%`"
                              :aria-valuenow="Math.round(playerStageProgress * 100)"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <div class="play-player-overlay__track" aria-hidden="true">
                                <div class="play-player-overlay__fill"></div>
                              </div>
                            </div>
	                        </div>
	                      </div>
	                      </div>
	                    </div>

                      <div class="tv-thirdparty-bar w-full rounded-xl border border-white/0 dark:border-white/30 bg-white/75 dark:bg-white/5 backdrop-blur-sm shadow-sm">
                        <div class="tv-thirdparty-bar__inner flex flex-wrap items-center justify-center gap-1.5 px-2 py-2">
                          <button
                            v-for="p in thirdPartyVisiblePlayers"
                            :key="p.icon"
                            type="button"
                            class="tv-thirdparty-btn"
                            :disabled="!playerUrl"
                            :title="p.name"
                            :aria-label="`使用${p.name}播放`"
                            @click="openWithThirdPartyPlayer(p)"
                          >
                            <img :src="`/images/${p.icon}.webp`" :alt="p.name" class="tv-thirdparty-icon" />
                          </button>

                          <button
                            type="button"
                            class="tv-thirdparty-expand"
                            :aria-label="thirdPartyExpanded ? '收起' : '展开'"
                            :title="thirdPartyExpanded ? '收起' : '展开'"
                            @click="toggleThirdPartyExpanded"
                          >
                            <svg
                              class="tv-thirdparty-expand__ico"
                              :class="{ 'tv-thirdparty-expand__ico--open': thirdPartyExpanded }"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
	                </div>

                <div id="episodePanel" class="relative w-full h-[320px] sm:h-[360px] md:h-auto md:overflow-hidden transition-all duration-300 ease-in-out md:col-span-1 lg:opacity-100 lg:scale-100">
                  <div id="episodePanelResizer" class="episode-resizer" aria-hidden="true"></div>
                  <div id="episodeSelector" class="md:ml-2 px-4 py-0 h-full min-h-0 rounded-xl bg-black/10 dark:bg-white/5 flex flex-col border border-white/0 dark:border-white/30 overflow-hidden">
                    <!-- Tab header -->
                    <div class="episode-tab-header flex mb-1 -mx-6 flex-shrink-0">
                      <button
                        id="tabEpisodes"
                        type="button"
                        class="flex-1 py-3 px-6 text-center cursor-pointer transition-all duration-200 font-medium"
                        :class="activeTab === 'episodes' ? 'text-green-600 dark:text-green-400' : 'text-gray-700 hover:text-green-600 bg-black/5 dark:bg-white/5 dark:text-gray-300 dark:hover:text-green-400 hover:bg-black/3 dark:hover:bg-white/3'"
                        @click="activeTab = 'episodes'"
                      >
                        选集
                      </button>
                      <button
                        id="tabSources"
                        type="button"
                        class="flex-1 py-3 px-6 text-center cursor-pointer transition-all duration-200 font-medium"
                        :class="activeTab === 'sources' ? 'text-green-600 dark:text-green-400' : 'text-gray-700 hover:text-green-600 bg-black/5 dark:bg-white/5 dark:text-gray-300 dark:hover:text-green-400 hover:bg-black/3 dark:hover:bg-white/3'"
                        @click="activeTab = 'sources'"
                      >
                        换源
                      </button>
                    </div>

                    <!-- Episodes tab -->
                    <div id="episodesTab" class="flex flex-col flex-1 min-h-0" v-show="activeTab === 'episodes'">
                      <div class="episode-controls-row flex items-center gap-2.5 mb-3 -mx-6 px-6 flex-shrink-0">
                        <div class="flex-1 min-w-0">
                          <div ref="panDropdownEl" class="custom-dropdown play-pan-dropdown">
                            <button
                              type="button"
                              class="custom-dropdown-btn play-pan-btn"
                              :disabled="panOptions.length === 0 && !smartListAvailable"
                              @click="panDropdownOpen = !panDropdownOpen"
                            >
                              {{ selectedPanLabel }}
                            </button>
                            <div class="custom-dropdown-list" :class="{ hidden: !panDropdownOpen }">
                              <div
                                v-if="smartListAvailable"
                                class="custom-dropdown-item"
                                :class="{ active: SMART_PAN_KEY === selectedPanKey }"
                                role="option"
                                @click="selectPan(SMART_PAN_KEY)"
                              >
                                {{ SMART_PAN_LABEL }}
                              </div>
                              <div
                                v-for="o in panOptions"
                                :key="o.key"
                                class="custom-dropdown-item"
                                :class="{ active: o.key === selectedPanKey }"
                                role="option"
                                @click="selectPan(o.key)"
                              >
                                {{ o.label }}
                              </div>
                              <div v-if="panOptions.length === 0 && !smartListAvailable" class="custom-dropdown-item">
                                {{ introLoading ? '加载中...' : '暂无数据' }}
                              </div>
                            </div>
                          </div>
	                        </div>
                        <div v-if="introLoading" class="flex-shrink-0 w-5 h-5 flex items-center justify-center" aria-label="加载中">
                          <div class="tv-spinner" aria-hidden="true"></div>
                        </div>
                        <button
                          id="rawListBtn"
                          type="button"
                          class="episode-control episode-control--btn flex-shrink-0"
                          :data-active="rawListMode ? 'true' : 'false'"
                          v-show="!forceRawListMode"
                          @click="toggleRawList"
                        >
                          {{ rawListMode ? '返回选集' : '原始列表' }}
                        </button>
                        <select
                          v-if="rawListMode && thirdPartyIsMobile && rawListPageOptions.length"
                          v-model.number="rawListPage"
                          class="episode-control episode-control--btn flex-shrink-0"
                          aria-label="原始列表范围"
                        >
                          <option v-for="o in rawListPageOptions" :key="o.page" :value="o.page">
                            {{ o.label }}
                          </option>
                        </select>
	                      </div>
	                      <div class="flex items-center gap-4 mb-4 border-b border-gray-300 dark:border-gray-700 -mx-6 px-6 flex-shrink-0" v-show="!rawListMode">
	                        <div class="flex-1 min-w-0">
	                          <div v-if="seasonTabs.length" class="episode-season-bar">
	                            <div class="episode-season-tabs">
	                              <button
	                                v-for="s in seasonTabs"
	                                :key="s.key"
	                                type="button"
	                                class="episode-season-btn"
	                                :data-active="Number(s.season) === Number(selectedSeason) ? 'true' : 'false'"
	                                @click="selectSeason(s.season)"
	                              >
	                                {{ s.label }}
	                              </button>
	                            </div>
	                          </div>
	                          <div class="episode-group-bar">
	                            <div ref="episodeGroupTabsEl" class="episode-group-tabs" @scroll.passive="updateHiddenEpisodeGroups">
	                              <button
	                                v-for="g in episodeGroups"
	                                :key="g.key"
                                type="button"
                                class="episode-group-btn"
                                :data-active="g.key === selectedEpisodeGroupKey ? 'true' : 'false'"
                                @click="selectEpisodeGroup(g.key)"
                              >
                                {{ g.label }}
                              </button>
                            </div>

                            <div
                              class="episode-group-more"
                              v-show="hiddenEpisodeGroups.length"
                              ref="episodeGroupMoreEl"
                              @mouseleave="episodeGroupMoreOpen = false"
                            >
                              <div
                                class="episode-group-more__btn"
                                role="button"
                                tabindex="0"
                                @mouseenter="onEpisodeGroupMoreEnter"
                                @click="episodeGroupMoreOpen = !episodeGroupMoreOpen"
                              >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                              </div>
                              <div
                                class="episode-group-more__menu"
                                :class="{ 'episode-group-more__menu--open': episodeGroupMoreOpen }"
                              >
                                <button
                                  v-for="g in episodeGroups"
                                  :key="g.key"
                                  type="button"
                                  class="episode-group-more__item"
                                  :data-active="g.key === selectedEpisodeGroupKey ? 'true' : 'false'"
                                  @click="selectEpisodeGroup(g.key); episodeGroupMoreOpen = false"
                                >
                                  {{ g.label }}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button id="episodeSortBtn" type="button" class="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-gray-700 hover:text-green-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-green-400 dark:hover:bg-white/20 transition-colors transform translate-y-[-4px]" aria-label="切换集数排序" @click="episodeDescending = !episodeDescending">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                          </svg>
                        </button>
                      </div>

	                      <div id="rawListView" ref="rawListViewEl" class="raw-list flex-1 overflow-y-auto content-start pb-4" v-show="rawListMode">
	                        <div v-if="introLoading" class="tv-center-loading">
	                          <div class="tv-spinner" aria-hidden="true"></div>
	                          <div class="tv-center-loading__text">加载中...</div>
	                        </div>
	                        <div v-else-if="introError" class="raw-list__hint raw-list__hint--error">{{ introError }}</div>
	                        <div v-else-if="rawListItems.length === 0" class="raw-list__hint">暂无原始列表</div>
	                        <div v-else class="raw-list__items">
                          <button
                            v-for="it in rawListPagedItems"
                            :key="it.key"
                            type="button"
                            class="raw-list__row"
                            :class="{ 'raw-list__row--active': it.index === selectedEpisodeIndex }"
                            :title="it.text"
                            @click="onRawListSelectEpisode(it.index)"
                          >
                            <span class="raw-list__text">{{ it.text }}</span>
                          </button>
                        </div>
                      </div>

	                      <div
	                        id="episodeButtons"
	                        class="relative flex flex-wrap gap-3 overflow-y-auto flex-1 content-start pb-4"
	                        v-show="!rawListMode"
	                      >
	                        <div v-if="introLoading" class="tv-episode-overlay" aria-hidden="true">
	                          <div class="tv-episode-overlay__inner">
	                            <div class="tv-spinner" aria-hidden="true"></div>
	                            <div class="tv-center-loading__text">加载中...</div>
	                          </div>
	                        </div>
	                        <div v-else-if="introError" class="tv-episode-overlay">
	                          <div class="tv-episode-overlay__inner">
	                            <div class="tv-center-loading__text text-red-600 dark:text-red-400">{{ introError }}</div>
	                          </div>
	                        </div>
	                        <template v-else>
	                          <template v-if="groupedDisplayedEpisodes.length">
	                            <button
	                              v-for="ep in groupedDisplayedEpisodes"
	                              :key="ep.key"
	                              type="button"
	                              class="episode-num-btn flex items-center justify-center text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap font-mono"
	                              :class="ep.index === selectedEpisodeIndex ? 'bg-green-500 text-white shadow-lg shadow-green-500/25 dark:bg-green-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20'"
	                              :title="ep.name"
	                              @click="selectEpisode(ep.index)"
	                            >
	                              {{ ep.displayNo != null ? ep.displayNo : ep.no }}
	                            </button>
	                          </template>
	                          <div v-else class="tv-episode-overlay">
	                            <div class="tv-episode-overlay__inner">
	                              <div class="tv-center-loading__text">暂无选集</div>
	                            </div>
	                          </div>
	                        </template>
	                      </div>
                    </div>

                    <!-- Sources tab -->
                    <div id="sourcesTab" class="flex flex-col flex-1 min-h-0 pt-4" v-show="activeTab === 'sources'">
                      <div ref="sourcesListEl" class="flex-1 min-h-0 overflow-y-auto space-y-2 pb-6">
                        <div
                          v-for="src in sourcesTabItems"
                          :key="`${src.siteKey}::${src.videoId}`"
                          :ref="src.active ? setActiveSourceCardEl : null"
                          class="source-card flex items-start gap-3 px-2 py-3 rounded-lg transition-all select-none duration-200 relative"
                          :class="src.active ? 'source-card--active' : 'source-card--idle'"
                          @click="src.active ? null : switchAggregatedSource(src)"
                        >
                          <div class="source-card__cover flex-shrink-0 w-12 h-20 rounded overflow-hidden">
                            <img
                              v-if="src.poster"
                              :src="src.poster"
                              :alt="src.title"
                              loading="lazy"
                              decoding="async"
                              referrerpolicy="no-referrer"
                              class="w-full h-full object-cover"
                            />
                            <div v-else class="w-full h-full bg-gray-300 dark:bg-gray-600"></div>
                          </div>

                          <div class="flex-1 min-w-0 flex flex-col gap-1 h-20">
                            <div class="flex items-start justify-between gap-3 h-6">
                              <div class="flex-1 min-w-0">
                                <h3 class="font-medium text-base truncate text-gray-900 dark:text-gray-100 leading-none">
                                  {{ src.title || '未命名' }}
                                </h3>
                              </div>
                              <div
                                v-if="src.active && siteQuality"
                                class="source-card__quality bg-gray-500/10 dark:bg-gray-400/20 text-green-600 dark:text-green-400 px-1.5 py-0 rounded text-xs flex-shrink-0 min-w-[50px] text-center"
                              >
                                {{ siteQuality }}
                              </div>
                            </div>

                            <div v-if="src.remark" class="h-5 flex items-center">
                              <span
                                class="inline-flex max-w-full items-center truncate bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm"
                                :title="src.remark"
                              >
                                {{ src.remark }}
                              </span>
                            </div>
                            <div v-else class="h-5"></div>

                            <div class="mt-auto flex items-center justify-between">
                              <span class="source-card__site text-xs px-2 py-1 border border-gray-500/60 rounded text-gray-700 dark:text-gray-200 truncate max-w-[70%]">
                                {{ src.siteName || '站点' }}
                              </span>
                              <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                {{ src.active ? `${siteEpisodes} 集` : '—' }}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          v-if="sourcesLoading || sourcesError || sourcesSearchedOnce || sourcesTabItems.length <= 1"
                          class="source-more-btn flex items-center justify-center gap-2 cursor-default"
                        >
                          <template v-if="sourcesLoading">
                            <div class="tv-spinner" aria-hidden="true"></div>
                            <span>正在加载...</span>
                          </template>
                          <template v-else-if="sourcesError">
                            <span class="text-red-600 dark:text-red-400">{{ sourcesError }}</span>
                          </template>
                          <template v-else>
                            <span>暂无更多</span>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white/80 dark:bg-gray-800/40 rounded-2xl p-4 sm:p-6 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm play-detail">
                <div class="play-detail__inner">
                  <div class="play-detail__poster">
                    <div class="play-detail__posterWrap">
                      <div class="play-detail__posterSkeleton" aria-hidden="true"></div>
                      <img
                        v-if="displayPoster"
                        :src="displayPoster"
                        :alt="displayTitle"
                        loading="lazy"
                        decoding="async"
                        referrerpolicy="no-referrer"
                        class="play-detail__posterImg"
                      />
                      <div v-else class="play-detail__posterFallback">
                        暂无封面
                      </div>
                    </div>
                  </div>

                    <div class="play-detail__info">
                      <div class="play-detail__titleRow">
                      <h1 class="play-detail__title">
                        <span class="block truncate">{{ displayTitle || '未命名' }}</span>
                      </h1>
                      <button
                        type="button"
                        class="play-detail__favBtn"
                        :class="isFavorited ? 'is-active' : ''"
                        :disabled="favoriteLoading || !canFavorite"
                        aria-label="收藏/取消收藏"
                        @click="toggleFavorite"
                      >
                        <svg
                          v-if="isFavorited"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          class="w-4 h-4 text-pink-500 dark:text-pink-400"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-1.344-.728 25.18 25.18 0 0 1-3.67-3.295 24.257 24.257 0 0 1-3.168-4.269c-.63-1.001-.839-2.145-.73-3.253.108-1.108.532-2.166 1.235-3.048a4.793 4.793 0 0 1 3.462-1.795c1.567-.08 3.113.582 4.084 1.816.97-1.234 2.517-1.896 4.084-1.816a4.793 4.793 0 0 1 3.462 1.795c.703.882 1.127 1.94 1.235 3.048.109 1.108-.1 2.252-.73 3.253a24.257 24.257 0 0 1-3.168 4.269 25.18 25.18 0 0 1-3.67 3.295 15.247 15.247 0 0 1-1.344.728l-.022.012-.007.003a.752.752 0 0 1-.704 0Z"
                          />
                        </svg>
                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          class="w-4 h-4 text-slate-400 dark:text-slate-300"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          aria-hidden="true"
                        >
                          <path
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </button>
                    </div>

                    <div v-if="metaPills.length" class="play-detail__meta">
                      <span v-for="p in metaPills" :key="p" class="play-pill">{{ p }}</span>
                    </div>

                    <div class="play-detail__desc" style="white-space: pre-line;">
	                      <template v-if="introLoading">简介加载中...</template>
	                      <template v-else-if="!introText && introError">{{ introError }}</template>
	                      <template v-else>{{ introText || '暂无简介' }}</template>
	                    </div>
	                  </div>
	                </div>
              </div>
            </div>
          </div>
        </main>
</template>

<script setup>
import { computed, nextTick, onMounted, onBeforeUnmount, onBeforeUpdate, ref, watch } from 'vue';
import { initPlayPage } from './playClient.js';
	import ArtPlayer from '../../shared/ArtPlayer.vue';
import { normalizeCatPawOpenApiBase, requestCatPlay, requestCatSpider } from '../../shared/catpawopen';
import { apiGetJson, apiPostJson, buildQuery } from '../../shared/apiClient';
import { processPosterUrl } from '../../shared/posterCard';

const props = defineProps({
  bootstrap: { type: Object, required: true },
  videoTitle: { type: String, default: '' },
  videoYear: { type: String, default: '' },
  searchType: { type: String, default: '' },
  siteKey: { type: String, default: '' },
  spiderApi: { type: String, default: '' },
  videoId: { type: String, default: '' },
  videoIntro: { type: String, default: '' },
  videoPoster: { type: String, default: '' },
  videoRemark: { type: String, default: '' },
  videoPanDir: { type: String, default: '' },
  contentKey: { type: String, default: '' },
});

const artPlayerRef = ref(null);

const THIRD_PARTY_PLAYERS = [
  { icon: 'iina', name: 'IINA', scheme: 'iina://weblink?url=$edurl', platforms: ['MacOS'] },
  { icon: 'potplayer', name: 'PotPlayer', scheme: 'potplayer://$durl', platforms: ['Windows'] },
  { icon: 'vlc', name: 'VLC', scheme: 'vlc://$durl', platforms: ['Windows', 'MacOS', 'Linux', 'Android', 'iOS'] },
  { icon: 'nplayer', name: 'nPlayer', scheme: 'nplayer-$durl', platforms: ['Android', 'iOS'] },
  { icon: 'omniplayer', name: 'OmniPlayer', scheme: 'omniplayer://weblink?url=$edurl', platforms: ['MacOS'] },
  { icon: 'figplayer', name: 'Fig Player', scheme: 'figplayer://weblink?url=$edurl', platforms: ['MacOS'] },
  { icon: 'infuse', name: 'Infuse', scheme: 'infuse://x-callback-url/play?url=$edurl', platforms: ['MacOS', 'iOS'] },
  { icon: 'fileball', name: 'Fileball', scheme: 'filebox://play?url=$edurl', platforms: ['MacOS', 'iOS'] },
  {
    icon: 'mxplayer',
    name: 'MX Player',
    scheme: 'intent:$durl#Intent;package=com.mxtech.videoplayer.ad;S.title=$name;end',
    platforms: ['Android'],
  },
  {
    icon: 'mxplayer-pro',
    name: 'MX Player Pro',
    scheme: 'intent:$durl#Intent;package=com.mxtech.videoplayer.pro;S.title=$name;end',
    platforms: ['Android'],
  },
  { icon: 'iPlay', name: 'iPlay', scheme: 'iplay://play/any?type=url&url=$bdurl', platforms: ['iOS'] },
  { icon: 'mpv', name: 'mpv', scheme: 'mpv://$edurl', platforms: ['Windows', 'MacOS', 'Linux', 'Android'] },
];

const THIRD_PARTY_EXPANDED_KEY = 'tv:play:third_party_players:expanded';
const thirdPartyExpanded = ref(false);
try {
  thirdPartyExpanded.value = localStorage.getItem(THIRD_PARTY_EXPANDED_KEY) === 'true';
} catch (_e) {}

const thirdPartyIsMobile = ref(false);
const updateThirdPartyIsMobile = () => {
  try {
    if (typeof window === 'undefined') return;
    thirdPartyIsMobile.value = window.innerWidth < 768;
  } catch (_e) {
    thirdPartyIsMobile.value = false;
  }
};
updateThirdPartyIsMobile();

const getPlatform = () => {
  try {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return 'Unknown';
    const ua = navigator.userAgent ? String(navigator.userAgent) : '';
    const touch =
      (typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0) ||
      'ontouchstart' in window;
    const isIos = /iPad|iPhone|iPod/i.test(ua) || (!!touch && /Macintosh/i.test(ua) && (navigator.maxTouchPoints || 0) > 1);
    if (isIos) return 'iOS';
    if (/Android/i.test(ua)) return 'Android';
    if (/Windows/i.test(ua)) return 'Windows';
    if (/Mac OS X/i.test(ua)) return 'MacOS';
    if (/Linux/i.test(ua)) return 'Linux';
    return 'Unknown';
  } catch (_e) {
    return 'Unknown';
  }
};

const thirdPartyCollapsedPlayers = computed(() => {
  if (thirdPartyIsMobile.value) {
    const wanted = ['mxplayer', 'infuse', 'nplayer'];
    const byIcon = new Map(THIRD_PARTY_PLAYERS.map((p) => [p.icon, p]));
    const out = [];
    const seen = new Set();
    for (const icon of wanted) {
      const p = byIcon.get(icon);
      if (!p) continue;
      if (seen.has(p.icon)) continue;
      seen.add(p.icon);
      out.push(p);
    }
    if (out.length >= 3) return out.slice(0, 3);
    // Fill to 3 (best-effort) to keep the bar consistent even if the list changes.
    const platform = getPlatform();
    const platformPlayers = platform === 'Unknown' ? THIRD_PARTY_PLAYERS : THIRD_PARTY_PLAYERS.filter((p) => p.platforms.includes(platform));
    for (const p of platformPlayers) {
      if (out.length >= 3) break;
      if (seen.has(p.icon)) continue;
      seen.add(p.icon);
      out.push(p);
    }
    return out.slice(0, 3);
  }

  const platform = getPlatform();
  const platformPlayers =
    platform === 'Unknown' ? THIRD_PARTY_PLAYERS : THIRD_PARTY_PLAYERS.filter((p) => p.platforms.includes(platform));
  return platformPlayers.slice(0, 3);
});

const thirdPartyVisiblePlayers = computed(() => {
  return thirdPartyExpanded.value ? THIRD_PARTY_PLAYERS : thirdPartyCollapsedPlayers.value;
});

const toggleThirdPartyExpanded = () => {
  thirdPartyExpanded.value = !thirdPartyExpanded.value;
  try {
    localStorage.setItem(THIRD_PARTY_EXPANDED_KEY, thirdPartyExpanded.value.toString());
  } catch (_e) {}
};

onMounted(() => {
  try {
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', updateThirdPartyIsMobile, { passive: true });
  } catch (_e) {}
});

onBeforeUnmount(() => {
  try {
    if (typeof window === 'undefined') return;
    window.removeEventListener('resize', updateThirdPartyIsMobile);
  } catch (_e) {}
});

const convertThirdPartyUrl = (scheme, args) => {
  let ans = String(scheme || '');
  ans = ans.replace('$name', args.name || '');
  ans = ans.replace(/\$[eb_]*url/g, (old) => {
    const op = old.match(/[eb]/g);
    let u = String(args.raw_url || '');
    if (op) {
      for (const o of op.reverse()) {
        if (o === 'e') u = encodeURIComponent(u);
        else if (o === 'b') u = window.btoa(u);
      }
    }
    return u;
  });
  ans = ans.replace(/\$[eb_]*durl/g, (old) => {
    const op = old.match(/[eb]/g);
    let u = String(args.d_url || '');
    if (op) {
      for (const o of op.reverse()) {
        if (o === 'e') u = encodeURIComponent(u);
        else if (o === 'b') u = window.btoa(u);
      }
    }
    return u;
  });
  return ans;
};

const openWithThirdPartyPlayer = (player) => {
  try {
    const p = player && typeof player === 'object' ? player : null;
    if (!p || !p.scheme) return;
    let durl = playerUrl && playerUrl.value ? String(playerUrl.value || '').trim() : '';
    if (!durl) return;

    const name = (displayTitle && displayTitle.value ? String(displayTitle.value) : props.videoTitle) || '';
    const href = convertThirdPartyUrl(p.scheme, { raw_url: '', name, d_url: durl });

    try {
      if (artPlayerRef.value && typeof artPlayerRef.value.pause === 'function') artPlayerRef.value.pause();
    } catch (_e) {}

    window.setTimeout(() => {
      try {
        window.location.href = href;
      } catch (_e) {
        try {
          window.open(href, '_self');
        } catch (_e2) {}
      }
    }, 0);
  } catch (_e) {}
};

const AGG_STORAGE_KEY = 'tv:search:aggregate:sources:v1';
const aggregatedSources = ref([]);
const aggregatedFromStorage = ref(false);

const normalizeForAggKey = (s) =>
  String(s || '')
    .toLowerCase()
    // Keep only letters/numbers/CJK to avoid source-specific punctuation/emoji breaking identity checks.
    .replace(/[^0-9a-z\u4e00-\u9fa5]+/gi, '')
    .trim();

const applyAggregateCleanRules = (title) => {
  const raw = typeof title === 'string' ? title : String(title || '');
  if (!raw) return '';
  const rules = compiledMagicAggregateRegexRules.value;
  let out = raw;
  if (Array.isArray(rules) && rules.length) {
    rules.forEach((re) => {
      if (!re) return;
      try {
        if (re.global || re.sticky) re.lastIndex = 0;
      } catch (_e) {}
      try {
        out = out.replace(re, '');
      } catch (_e) {}
    });
  }
  return String(out || '').trim();
};

const topLeftTitle = computed(() => {
  const base = (displayTitle.value || props.videoTitle || '').trim();
  const cleaned = applyAggregateCleanRules(base);
  return cleaned || base || '未命名';
});

const getStableContentKey = () => {
  const fromProps = normalizeForAggKey(props.contentKey || '');
  if (fromProps) return fromProps;
  const fromHistory = normalizeForAggKey(resumeHistory.value && resumeHistory.value.contentKey ? resumeHistory.value.contentKey : '');
  if (fromHistory) return fromHistory;
  const base = computeHistoryContentKey(props.videoTitle || '');
  if (base) return base;
  return normalizeForAggKey(props.videoTitle || '');
};

const getSourcesSearchQuery = () => {
  const cleaned = applyAggregateCleanRules(props.videoTitle || '');
  if (cleaned) return cleaned;
  const fromHistory = resumeHistory.value && typeof resumeHistory.value.contentKey === 'string' ? resumeHistory.value.contentKey.trim() : '';
  if (fromHistory) return fromHistory;
  const fromProps = typeof props.contentKey === 'string' ? props.contentKey.trim() : '';
  if (fromProps) return fromProps;
  return (props.videoTitle || '').trim();
};

const loadAggregatedSourcesFromStorage = () => {
  const titleKey = getStableContentKey();
  if (!titleKey) {
    aggregatedSources.value = [];
    aggregatedFromStorage.value = false;
    return;
  }
  try {
    const raw = sessionStorage.getItem(AGG_STORAGE_KEY);
    const parsed = raw && raw.trim() ? JSON.parse(raw) : null;
    const parsedKey = parsed && typeof parsed.lastKey === 'string' ? parsed.lastKey.trim() : parsed && typeof parsed.key === 'string' ? parsed.key.trim() : '';
    const groups = parsed && parsed.version === 2 && parsed.groups && typeof parsed.groups === 'object' ? parsed.groups : parsed && parsed.groups && typeof parsed.groups === 'object' ? parsed.groups : null;
    const group = groups && groups[titleKey] && typeof groups[titleKey] === 'object' ? groups[titleKey] : null;
    const activeKey = group ? titleKey : parsedKey;
    if (!activeKey || activeKey !== titleKey) {
      aggregatedSources.value = [];
      aggregatedFromStorage.value = false;
      return;
    }
    const sources = group && Array.isArray(group.sources) ? group.sources : parsed && Array.isArray(parsed.sources) ? parsed.sources : [];
    const uniq = new Set();
    aggregatedSources.value = sources
      .map((s) => ({
        siteKey: s && s.siteKey ? String(s.siteKey) : '',
        spiderApi: s && s.spiderApi ? String(s.spiderApi) : '',
        siteName: s && s.siteName ? String(s.siteName) : '',
        videoId: s && s.videoId ? String(s.videoId) : '',
        videoTitle: s && s.videoTitle ? String(s.videoTitle) : '',
        videoPoster: s && s.videoPoster ? String(s.videoPoster) : '',
        videoRemark: s && s.videoRemark ? String(s.videoRemark) : '',
      }))
      .filter((s) => {
        if (!s.siteKey || !s.spiderApi || !s.videoId) return false;
        const k = `${s.siteKey}::${s.videoId}`;
        if (uniq.has(k)) return false;
        uniq.add(k);
        return true;
      });
    aggregatedFromStorage.value = aggregatedSources.value.length > 0;
  } catch (_e) {
    aggregatedSources.value = [];
    aggregatedFromStorage.value = false;
  }
};

const sourcesLoading = ref(false);
const sourcesError = ref('');
const sourcesSearchedOnce = ref(false);
const sourcesSearchState = { seq: 0 };

const invalidateSourcesSearch = () => {
  sourcesSearchState.seq += 1;
  sourcesLoading.value = false;
};

const fetchUserSitesCached = async (ttlMs = 15 * 1000) => {
  const data = await apiGetJson('/api/user/sites', { cacheMs: ttlMs });
  return data && typeof data === 'object' ? data : {};
};

const resolveCatApiBaseForPlay = () => {
  const role = props.bootstrap && props.bootstrap.user && props.bootstrap.user.role ? String(props.bootstrap.user.role) : '';
  const userBase = props.bootstrap?.settings?.userCatPawOpenApiBase || '';
  const serverBase = props.bootstrap?.settings?.catPawOpenApiBase || '';
  return (role === 'user' ? userBase : (userBase || serverBase)).trim();
};

const isConfigCenterSite = (s) => {
  const api = s && typeof s.api === 'string' ? s.api : '';
  const key = s && typeof s.key === 'string' ? s.key : '';
  return api.includes('/spider/baseset/') || key.toLowerCase().includes('baseset');
};

const normalizeSearchList = (data) => {
  const list = data && Array.isArray(data.list) ? data.list : [];
  return list
    .map((it) => ({
      id: it && (it.vod_id != null ? String(it.vod_id) : it.id != null ? String(it.id) : ''),
      name: it && (it.vod_name != null ? String(it.vod_name) : it.name != null ? String(it.name) : ''),
      pic: it && (it.vod_pic != null ? String(it.vod_pic) : it.pic != null ? String(it.pic) : ''),
      remark:
        it && (it.vod_remarks != null ? String(it.vod_remarks) : it.remark != null ? String(it.remark) : ''),
    }))
    .filter((it) => it && it.name);
};

const fetchAggregatedSourcesExactMatches = async () => {
  if (sourcesLoading.value) return;
  const qRaw = getSourcesSearchQuery();
  const qKey = getStableContentKey();
  if (!qRaw || !qKey) return;

  sourcesSearchState.seq += 1;
  const seqAtCall = sourcesSearchState.seq;

  sourcesLoading.value = true;
  sourcesError.value = '';
  sourcesSearchedOnce.value = false;
  aggregatedSources.value = [];
  const yieldToUi = () =>
    new Promise((resolve) => {
      try {
        if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
          window.requestAnimationFrame(() => resolve());
          return;
        }
      } catch (_e) {}
      setTimeout(resolve, 0);
    });
  try {
    const data = await fetchUserSitesCached();
    if (seqAtCall !== sourcesSearchState.seq) return;
    const sites = Array.isArray(data && data.sites) ? data.sites : [];
    const enabledSites = sites.filter((s) => s && s.enabled !== false && s.search !== false && s.api && !isConfigCenterSite(s));

    const apiBase = resolveCatApiBaseForPlay();
    const tvUser = props.bootstrap?.user?.username || '';
    if (!apiBase) throw new Error('CatPawOpen 接口地址未设置');

    const concurrencyRaw = props.bootstrap?.settings?.searchThreadCount;
    const concurrencyNum = Number(concurrencyRaw);
    const concurrency =
      Number.isFinite(concurrencyNum) && concurrencyNum > 0 ? Math.min(50, Math.floor(concurrencyNum)) : 5;

    const queue = enabledSites.slice();
    const out = [];
    const outUniq = new Set();
    const runOne = async () => {
      while (queue.length) {
        if (seqAtCall !== sourcesSearchState.seq) return;
        const site = queue.shift();
        if (!site) continue;
        try {
          const raw = await requestCatSpider({
            apiBase,
            username: tvUser,
            action: 'search',
            spiderApi: site.api,
            payload: { wd: qRaw, page: 1 },
          });
          if (seqAtCall !== sourcesSearchState.seq) return;
          const items = normalizeSearchList(raw);
          let pushed = false;
          items.forEach((it) => {
            if (seqAtCall !== sourcesSearchState.seq) return;
            const key = normalizeForAggKey(it.name);
            if (!key || key !== qKey) return;
            const siteKey = site && site.key ? String(site.key) : '';
            const spiderApi = site && site.api ? String(site.api) : '';
            const videoId = it && it.id ? String(it.id) : '';
            if (!siteKey || !spiderApi || !videoId) return;
            const uniq = `${siteKey}::${videoId}`;
            if (outUniq.has(uniq)) return;
            outUniq.add(uniq);
            const entry = {
              siteKey,
              spiderApi,
              siteName: site && site.name ? String(site.name) : siteKey,
              videoId,
              videoTitle: it && it.name ? String(it.name) : '',
              videoPoster: it && it.pic ? String(it.pic) : '',
              videoRemark: it && it.remark ? String(it.remark) : '',
            };
            out.push(entry);
            aggregatedSources.value.push(entry);
            pushed = true;
          });
          if (pushed && seqAtCall === sourcesSearchState.seq) await yieldToUi();
        } catch (_e) {
          // ignore per-site failures; continue
        }
      }
    };

    await Promise.allSettled(new Array(Math.max(1, concurrency)).fill(null).map(runOne));
    if (seqAtCall !== sourcesSearchState.seq) return;
    sourcesSearchedOnce.value = true;

    try {
      const prevRaw = sessionStorage.getItem(AGG_STORAGE_KEY) || '';
      const prev = prevRaw && prevRaw.trim() ? JSON.parse(prevRaw) : null;
      const groups =
        prev && prev.version === 2 && prev.groups && typeof prev.groups === 'object'
          ? { ...prev.groups }
          : {};
      groups[qKey] = { sources: out, updatedAt: Date.now(), q: qRaw };
      sessionStorage.setItem(AGG_STORAGE_KEY, JSON.stringify({ version: 2, q: qRaw, groups, lastKey: qKey }));
    } catch (_e) {}
  } catch (e) {
    if (seqAtCall === sourcesSearchState.seq) {
      sourcesError.value = e && e.message ? String(e.message) : '换源搜索失败';
    }
  } finally {
    if (seqAtCall === sourcesSearchState.seq) sourcesLoading.value = false;
  }
};

const exitPlay = () => {
  try {
    // Stop playback immediately (avoid continuing audio in background).
    if (artPlayerRef.value && typeof artPlayerRef.value.destroy === 'function') {
      artPlayerRef.value.destroy();
    }
    playerUrl.value = '';
    playerHeaders.value = {};
    playerMetaReady.value = false;
    playerBuffering.value = false;
    playerPlaybackStarted.value = false;
    playerFirstFrameReady.value = false;
    if (playerFirstFrameTimer) {
      window.clearTimeout(playerFirstFrameTimer);
      playerFirstFrameTimer = 0;
    }
    window.dispatchEvent(new CustomEvent('tv:exit-play'));
  } catch (_e) {}
};

const resetForNewVideo = () => {
  try {
    if (artPlayerRef.value && typeof artPlayerRef.value.destroy === 'function') {
      artPlayerRef.value.destroy();
    }
  } catch (_e) {}
  playerUrl.value = '';
  playerHeaders.value = {};
  playerMetaReady.value = false;
  playerBuffering.value = false;
  playerPlaybackStarted.value = false;
  playerFirstFrameReady.value = false;
  if (playerFirstFrameTimer) {
    window.clearTimeout(playerFirstFrameTimer);
    playerFirstFrameTimer = 0;
  }
  playLoading.value = false;
  playError.value = '';
  playerRuntimeError.value = '';
  playingPanKey.value = '';
  playingEpisodeIndex.value = -1;
  selectedPan.value = '';
  panDropdownOpen.value = false;
  selectedEpisodeIndex.value = 0;
  selectedEpisodeGroup.value = '';
  selectedSeason.value = 0;
  episodeGroupMoreOpen.value = false;
  historyCoverPoster.value = '';
  historyCoverLocked.value = false;
  lastHistoryPayload.value = null;
  introError.value = '';
  introLoading.value = false;
  introText.value = (props.videoIntro || '').trim();
  autoPickedEpisodeFromVideoId.value = false;
  detail.value = {
    title: '',
    poster: '',
    year: '',
    type: '',
    remark: '',
    content: '',
    playFrom: '',
    playUrl: '',
  };
};

const resetForNewSource = () => {
  try {
    if (artPlayerRef.value && typeof artPlayerRef.value.destroy === 'function') {
      artPlayerRef.value.destroy();
    }
  } catch (_e) {}
  playerUrl.value = '';
  playerHeaders.value = {};
  playerMetaReady.value = false;
  playerBuffering.value = false;
  playerPlaybackStarted.value = false;
  playerFirstFrameReady.value = false;
  if (playerFirstFrameTimer) {
    window.clearTimeout(playerFirstFrameTimer);
    playerFirstFrameTimer = 0;
  }
  playLoading.value = false;
  playError.value = '';
  playerRuntimeError.value = '';
  playingPanKey.value = '';
  playingEpisodeIndex.value = -1;
  selectedPan.value = '';
  panDropdownOpen.value = false;
  selectedEpisodeGroup.value = '';
  selectedSeason.value = 0;
  episodeGroupMoreOpen.value = false;
  introLoading.value = false;
  introError.value = '';
  autoPickedEpisodeFromVideoId.value = false;
  // Keep intro/meta, but refresh episode list from the new source.
  detail.value = {
    ...detail.value,
    playFrom: '',
    playUrl: '',
  };
};

const cleanupFns = [];

const isIos = ref(false);
onMounted(() => {
  try {
    const ua = typeof navigator !== 'undefined' && navigator.userAgent ? String(navigator.userAgent) : '';
    const touch =
      (typeof navigator !== 'undefined' && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0) ||
      (typeof window !== 'undefined' && 'ontouchstart' in window);
    const ios = /iPad|iPhone|iPod/i.test(ua) || (!!touch && /Macintosh/i.test(ua) && (navigator.maxTouchPoints || 0) > 1);
    isIos.value = !!ios;
  } catch (_e) {
    isIos.value = false;
  }
});

const introLoading = ref(false);
const introError = ref('');
const introText = ref((props.videoIntro || '').trim());
const rawListMode = ref(false);
const autoRawListMode = ref(false);
const viewModeTouchedKey = ref('');
const activeTab = ref('episodes');
const episodeDescending = ref(false);
const sourcesListEl = ref(null);
const activeSourceCardEl = ref(null);
const rawListViewEl = ref(null);
const RAW_LIST_PAGE_SIZE = 20;
const rawListPage = ref(0);
const setActiveSourceCardEl = (el) => {
  if (el) activeSourceCardEl.value = el;
};

const scrollSourcesToActive = async (opts = {}) => {
  const { behavior = 'auto' } = opts && typeof opts === 'object' ? opts : {};
  await nextTick();
  const container = sourcesListEl.value;
  const el = activeSourceCardEl.value;
  if (!container || !el) return;
  try {
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    const fullyVisible = eRect.top >= cRect.top && eRect.bottom <= cRect.bottom;
    if (fullyVisible) return;

    const targetTop =
      container.scrollTop + (eRect.top - cRect.top) - (container.clientHeight / 2 - el.clientHeight / 2);
    const maxTop = Math.max(0, container.scrollHeight - container.clientHeight);
    const top = Math.max(0, Math.min(maxTop, Math.round(targetTop)));
    if (Math.abs(container.scrollTop - top) <= 2) return;
    if (typeof container.scrollTo === 'function') container.scrollTo({ top, behavior });
    else container.scrollTop = top;
  } catch (_e) {}
};

onBeforeUpdate(() => {
  activeSourceCardEl.value = null;
});
const selectedEpisodeIndex = ref(0);
const autoPickedEpisodeFromVideoId = ref(false);
const playLoading = ref(false);
const playError = ref('');
const playerRuntimeError = ref('');
const favoriteLoading = ref(false);
const isFavorited = ref(false);
const playerUrl = ref('');
const playerHeaders = ref({});
const playerMetaReady = ref(false);
const playerBuffering = ref(false);
const playerPlaybackStarted = ref(false);
const playerFirstFrameReady = ref(false);
let playerFirstFrameTimer = 0;
const playingPanKey = ref('');
const playingEpisodeIndex = ref(-1);
const initialAutoPlayTriggered = ref(false);
const selectedPan = ref('');
const panDropdownOpen = ref(false);
const panDropdownEl = ref(null);
const resumeHistory = ref(null);
const resumeHistoryLoaded = ref(false);
const resumeHistoryApplied = ref(false);
const panPrefApplied = ref(false);
const resumeHistoryState = { seq: 0, key: '', inFlight: null };
const detail = ref({
  title: '',
  poster: '',
  year: '',
  type: '',
  remark: '',
  content: '',
  playFrom: '',
  playUrl: '',
});

const resolvedSpiderApi = computed(() => {
  const direct = (props.spiderApi || '').trim();
  if (direct) return direct;
  const key = (props.siteKey || '').trim();
  if (!key) return '';
  const sites = props.bootstrap && props.bootstrap.settings && Array.isArray(props.bootstrap.settings.homeSites)
    ? props.bootstrap.settings.homeSites
    : [];
  const found = sites.find((s) => s && s.key === key);
  const fromHome = found && found.api ? String(found.api) : '';
  return fromHome;
});

const resolvedSpiderApiFallback = ref('');
const ensureResolvedSpiderApiFallback = async () => {
  try {
    if ((props.spiderApi || '').trim()) return;
    if (resolvedSpiderApiFallback.value) return;
    const siteKey = (props.siteKey || '').trim();
    if (!siteKey) return;
    const data = await fetchUserSitesCached(10 * 1000);
    const sites = Array.isArray(data && data.sites) ? data.sites : [];
    const found = sites.find((s) => s && String(s.key || '').trim() === siteKey) || null;
    const api = found && typeof found.api === 'string' ? found.api.trim() : '';
    if (api) resolvedSpiderApiFallback.value = api;
  } catch (_e) {}
};

const resolvedSpiderApiFinal = computed(() => {
  const direct = (props.spiderApi || '').trim();
  if (direct) return direct;
  const fromHome = resolvedSpiderApi.value;
  if (fromHome) return fromHome;
  return (resolvedSpiderApiFallback.value || '').trim();
});

watch(
  () => `${(props.siteKey || '').trim()}|${(props.spiderApi || '').trim()}`,
  () => {
    resolvedSpiderApiFallback.value = '';
    void ensureResolvedSpiderApiFallback();
  },
  { immediate: true }
);

watch(
  () => (resumeHistory.value && typeof resumeHistory.value.spiderApi === 'string' ? resumeHistory.value.spiderApi.trim() : ''),
  (api) => {
    if ((props.spiderApi || '').trim()) return;
    if (resolvedSpiderApi.value) return;
    if (resolvedSpiderApiFallback.value) return;
    if (api) resolvedSpiderApiFallback.value = api;
  }
);

const resolvedSiteName = computed(() => {
  const key = (props.siteKey || '').trim();
  if (!key) return '';
  const sites =
    props.bootstrap && props.bootstrap.settings && Array.isArray(props.bootstrap.settings.homeSites)
      ? props.bootstrap.settings.homeSites
      : [];
  const found = sites.find((s) => s && s.key === key);
  const name = found && found.name ? String(found.name) : '';
  return name.trim();
});

const sourcesTabItems = computed(() => {
  const currentSiteKey = (props.siteKey || '').trim();
  const currentVideoId = (props.videoId || '').trim();
  const homeSites =
    props.bootstrap && props.bootstrap.settings && Array.isArray(props.bootstrap.settings.homeSites)
      ? props.bootstrap.settings.homeSites
      : [];
  const homeOrder = homeSites
    .map((s) => (s && typeof s.key === 'string' ? s.key.trim() : ''))
    .filter((k) => k);
  const fallbackOrder =
    props.bootstrap && props.bootstrap.settings && Array.isArray(props.bootstrap.settings.searchSiteOrder)
      ? props.bootstrap.settings.searchSiteOrder
      : [];
  const order = homeOrder.length ? homeOrder : fallbackOrder;
  const orderMap = new Map();
  order.forEach((k, idx) => {
    const kk = typeof k === 'string' ? k.trim() : '';
    if (kk && !orderMap.has(kk)) orderMap.set(kk, idx);
  });

  const list = [];
  const uniq = new Set();
  const pushOne = (x) => {
    if (!x || !x.siteKey || !x.spiderApi || !x.videoId) return;
    const k = `${x.siteKey}::${x.videoId}`;
    if (uniq.has(k)) return;
    uniq.add(k);
    list.push(x);
  };

  pushOne({
    active: true,
    siteKey: currentSiteKey,
    spiderApi: resolvedSpiderApiFinal.value,
    siteName: resolvedSiteName.value || '站点',
    videoId: currentVideoId,
    title: displayTitle.value || '未命名',
    poster: displayPoster.value,
    remark: (detail.value.remark || props.videoRemark || '').trim(),
  });

  (aggregatedSources.value || []).forEach((s) => {
    pushOne({
      active: false,
      siteKey: s.siteKey,
      spiderApi: s.spiderApi,
      siteName: s.siteName || s.siteKey,
      videoId: s.videoId,
      title: s.videoTitle || '未命名',
      poster: processPosterUrl(s.videoPoster || ''),
      remark: (s.videoRemark || '').trim(),
    });
  });

  return list
    .filter((x) => x && x.siteKey && x.spiderApi && x.videoId)
    .slice()
    .sort((a, b) => {
      const ao = orderMap.has(a.siteKey) ? orderMap.get(a.siteKey) : 999999;
      const bo = orderMap.has(b.siteKey) ? orderMap.get(b.siteKey) : 999999;
      if (ao !== bo) return ao - bo;
      return (a.siteName || a.siteKey).localeCompare(b.siteName || b.siteKey, 'zh');
    });
});

const switchAggregatedSource = (src) => {
  if (!src || src.active) return;
  try {
    window.dispatchEvent(
      new CustomEvent('tv:open-play', {
        detail: {
          siteKey: src.siteKey || '',
          spiderApi: src.spiderApi || '',
          videoId: src.videoId || '',
          videoTitle: src.title || '',
          videoPoster: src.poster || '',
          videoRemark: src.remark || '',
          contentKey: getStableContentKey(),
        },
      })
    );
  } catch (_e) {}
};

const displayTitle = computed(() => {
  return (detail.value.title || props.videoTitle || '').trim();
});

const displayPoster = computed(() => {
  return processPosterUrl((detail.value.poster || props.videoPoster || '').trim());
});

const historyCoverPoster = ref('');
const historyCoverLocked = ref(false);
const lastHistoryPayload = ref(null);

watch(
  () => displayPoster.value,
  (p) => {
    if (historyCoverPoster.value) return;
    const next = typeof p === 'string' ? p.trim() : '';
    if (next) historyCoverPoster.value = next;
  },
  { immediate: true }
);

const pickHistoryPoster = () => {
  const currentSiteKey = (props.siteKey || '').trim();
  const preferred = props.bootstrap?.settings?.searchCoverSite ? String(props.bootstrap.settings.searchCoverSite).trim() : '';
  const order =
    props.bootstrap && props.bootstrap.settings && Array.isArray(props.bootstrap.settings.searchSiteOrder)
      ? props.bootstrap.settings.searchSiteOrder
      : [];
  const orderMap = new Map();
  order.forEach((k, idx) => {
    const kk = typeof k === 'string' ? k.trim() : '';
    if (kk && !orderMap.has(kk)) orderMap.set(kk, idx);
  });

  const list = [];
  if (currentSiteKey && displayPoster.value) {
    list.push({ siteKey: currentSiteKey, poster: displayPoster.value });
  }
  (aggregatedSources.value || []).forEach((s) => {
    if (!s || !s.siteKey || !s.videoPoster) return;
    list.push({ siteKey: s.siteKey, poster: processPosterUrl(s.videoPoster) });
  });

  const pickFrom = (siteKey) => {
    const found = list.find((x) => x && x.siteKey === siteKey && x.poster);
    return found ? found.poster : '';
  };

  if (preferred) {
    const p = pickFrom(preferred);
    if (p) return p;
  }
  const ordered = list
    .slice()
    .sort((a, b) => {
      const ao = orderMap.has(a.siteKey) ? orderMap.get(a.siteKey) : 999999;
      const bo = orderMap.has(b.siteKey) ? orderMap.get(b.siteKey) : 999999;
      return ao - bo;
    });
  const first = ordered.find((x) => x && x.poster);
  return first ? first.poster : displayPoster.value || '';
};

const persistHistoryPosterIfPossible = async () => {
  const base = lastHistoryPayload.value && typeof lastHistoryPayload.value === 'object' ? lastHistoryPayload.value : null;
  if (!base) return;
  try {
    await apiPostJson(
      '/api/playhistory',
      {
        ...base,
        videoPoster: historyCoverPoster.value || base.videoPoster || '',
        forcePosterUpdate: true,
      },
      { dedupe: false }
    );
    window.dispatchEvent(new CustomEvent('tv:play-history-updated'));
  } catch (_e) {
    // ignore
  }
};

const tryLockHistoryPoster = async (opts = {}) => {
  const { force = false, allowFallback = false } = opts || {};
  if (historyCoverLocked.value) return;

  const preferred = props.bootstrap?.settings?.searchCoverSite ? String(props.bootstrap.settings.searchCoverSite).trim() : '';
  if (!force && preferred) {
    const hit = (aggregatedSources.value || []).find((s) => s && s.siteKey === preferred && s.videoPoster);
    if (!hit) return;
  }

  const picked = pickHistoryPoster();
  const next = typeof picked === 'string' ? picked.trim() : '';
  if (!next) {
    if (!allowFallback) return;
    const fallback = displayPoster.value || '';
    if (!fallback) return;
    historyCoverPoster.value = fallback;
    historyCoverLocked.value = true;
    return;
  }

  historyCoverPoster.value = next;
  historyCoverLocked.value = true;
  await persistHistoryPosterIfPossible();
};

const canFavorite = computed(() => {
  const siteKey = (props.siteKey || '').trim();
  const spiderApi = (resolvedSpiderApiFinal.value || '').trim();
  const videoId = (props.videoId || '').trim();
  const title = displayTitle.value || '';
  return !!(siteKey && spiderApi && videoId && title);
});

const favoriteStatusState = { key: '', inFlight: null, seq: 0 };

const loadFavoriteStatus = async () => {
  const siteKey = (props.siteKey || '').trim();
  const videoId = (props.videoId || '').trim();
  if (!siteKey || !videoId) {
    isFavorited.value = false;
    return;
  }
  const k = `${siteKey}::${videoId}`;
  if (favoriteStatusState.inFlight && favoriteStatusState.key === k) {
    await favoriteStatusState.inFlight;
    return;
  }
  let seqAtCall = 0;
  try {
    favoriteStatusState.seq += 1;
    seqAtCall = favoriteStatusState.seq;
    favoriteStatusState.key = k;
    favoriteStatusState.inFlight = (async () => {
      const data = await apiGetJson(`/api/favorites/status${buildQuery({ siteKey, videoId })}`, { cacheMs: 2000 });
      if (seqAtCall === favoriteStatusState.seq) {
        isFavorited.value = !!(data && data.favorited);
      }
    })();
    await favoriteStatusState.inFlight;
  } catch (_e) {
    isFavorited.value = false;
  } finally {
    if (seqAtCall && favoriteStatusState.key === k && favoriteStatusState.seq === seqAtCall) {
      favoriteStatusState.inFlight = null;
    }
  }
};

const toggleFavorite = async () => {
  if (favoriteLoading.value) return;
  if (!canFavorite.value) return;
  favoriteLoading.value = true;
  try {
    const siteKey = (props.siteKey || '').trim();
    const spiderApi = (resolvedSpiderApiFinal.value || '').trim();
    const videoId = (props.videoId || '').trim();
    const videoTitle = displayTitle.value || '';
    const data = await apiPostJson(
      '/api/favorites/toggle',
      {
        siteKey,
        siteName: resolvedSiteName.value || '',
        spiderApi,
        videoId,
        videoTitle,
        videoPoster: displayPoster.value || '',
        videoRemark: (props.videoRemark || '').trim(),
      },
      { dedupe: false }
    );
    if (!data || data.success !== true) throw new Error((data && data.message) || '保存失败');
    isFavorited.value = !!data.favorited;
    window.dispatchEvent(new CustomEvent('tv:favorites-updated'));
  } catch (_e) {
    // ignore
  } finally {
    favoriteLoading.value = false;
  }
};

const displayYear = computed(() => {
  return (detail.value.year || props.videoYear || '').trim();
});

const splitTags = (v) => {
  const raw = typeof v === 'string' ? v.trim() : '';
  if (!raw) return [];
  return raw
    .split(/[,\s/|]+/g)
    .map((s) => s.trim())
    .filter(Boolean);
};

const metaPills = computed(() => {
  const pills = [];
  const typeLabel = (detail.value.type || '').trim();
  if (typeLabel) pills.push(...splitTags(typeLabel));
  if (searchTypeLabel.value) pills.push(searchTypeLabel.value);
  const y = displayYear.value;
  if (y) pills.push(y);
  const siteName = resolvedSiteName.value;
  if (siteName) pills.push(siteName);
  const remark = (detail.value.remark || props.videoRemark || '').trim();
  if (remark) pills.push(remark);
  const uniq = [];
  const seen = new Set();
  pills.forEach((p) => {
    const key = p.toLowerCase();
    if (!p || seen.has(key)) return;
    seen.add(key);
    uniq.push(p);
  });
  return uniq;
});

const parsePlaySources = (fromRaw, urlRaw) => {
  const fromStr = typeof fromRaw === 'string' ? fromRaw.trim() : '';
  const urlStr = typeof urlRaw === 'string' ? urlRaw.trim() : '';
  if (!fromStr && !urlStr) return [];

  const splitTop = (s) => (s ? s.split('$$$') : []);
  const fromParts = splitTop(fromStr);
  const urlParts = splitTop(urlStr);
  const len = Math.max(fromParts.length, urlParts.length);
  const rawItems = [];
  for (let i = 0; i < len; i += 1) {
    const baseLabel = (fromParts[i] || '').trim() || `源${i + 1}`;
    const baseUrl = (urlParts[i] || '').trim();
    if (!baseUrl && !baseLabel) continue;

    // Only split by `|||` when the label side explicitly includes it.
    // Some scripts emit `|||` only on the URL side, which would otherwise create fake sub-sources like `xxx-2`.
    const fromSubs = baseLabel.includes('|||') ? baseLabel.split('|||').map((x) => x.trim()) : [baseLabel];
    const urlSubs = baseLabel.includes('|||') && baseUrl.includes('|||') ? baseUrl.split('|||').map((x) => x.trim()) : [baseUrl];
    const subLen = Math.max(fromSubs.length, urlSubs.length);

    for (let j = 0; j < subLen; j += 1) {
      const label = (fromSubs[j] || '').trim() || (subLen > 1 ? `${baseLabel}-${j + 1}` : baseLabel);
      const u = (urlSubs[j] || '').trim();
      if (!u) continue;

      const parseEpisodeSeg = (seg, flag) => {
        const s = String(seg || '').trim();
        if (!s) return null;
        const idx = s.indexOf('$');
        if (idx <= 0) {
          // Some sources return bare ids (no `$`), which are still valid play ids.
          return { name: s, url: s, flag };
        }
        const name = s.slice(0, idx).trim();
        const url = s.slice(idx + 1).trim();
        return { name: name || s, url: url || s, flag };
      };

      const segs = u
        .split('#')
        .map((seg) => String(seg || '').trim())
        .filter(Boolean);

      // Some scripts encode per-episode "flag" in vod_play_from like:
      //   百度原画-xxxx#01$$$百度原画-xxxx#02 ...
      // In that case, each `$$$` entry holds exactly one episode, and the flag must come from that entry.
      const flagForThisItem = String(label || '').trim();
      const episodes = segs.map((seg) => parseEpisodeSeg(seg, flagForThisItem)).filter(Boolean);
      rawItems.push({ label: flagForThisItem, episodes });
    }
  }

  const normalizeLabelForGrouping = (label) => {
    const s = typeof label === 'string' ? label.trim() : '';
    if (!s) return '';
    return s.replace(/#\d{1,3}\s*$/i, '').trim();
  };

  // Group by normalized label to avoid exploding pan options (e.g. `xxx#01`, `xxx#02`).
  const groups = new Map();
  rawItems.forEach((it) => {
    const rawLabel = (it && it.label ? String(it.label) : '').trim();
    const label = normalizeLabelForGrouping(rawLabel) || rawLabel || '未知源';
    const key = label.toLowerCase();
    const existing = groups.get(key);
    const nextEps = it && Array.isArray(it.episodes) ? it.episodes : [];
    if (!existing) {
      groups.set(key, { label, episodes: nextEps.slice() });
      return;
    }
    // Keep episode order; de-dupe by (flag,url) to avoid exact duplicates.
    const seen = new Set(existing.episodes.map((e) => `${(e && e.flag) || ''}::${(e && e.url) || ''}`));
    nextEps.forEach((e) => {
      const k = `${(e && e.flag) || ''}::${(e && e.url) || ''}`;
      if (!e || !e.url || seen.has(k)) return;
      seen.add(k);
      existing.episodes.push(e);
    });
  });

  const out = [];
  Array.from(groups.values()).forEach((g, idx) => {
    const episodes = Array.isArray(g.episodes) ? g.episodes.filter((e) => e && e.url) : [];
    if (!episodes.length) return;
    out.push({ key: `p${idx}`, label: g.label, episodes });
  });
  return out;
};

const SMART_PAN_KEY = 'smart';
const SMART_PAN_LABEL = '智能列表';

const panOptions = computed(() => parsePlaySources(detail.value.playFrom, detail.value.playUrl));
const selectedPanKey = computed(() => {
  return selectedPan.value || panOptions.value[0]?.key || '';
});

const maxPanEpisodeCount = computed(() => {
  const list = panOptions.value;
  if (!list.length) return 0;
  let max = 0;
  list.forEach((s) => {
    const n = s && Array.isArray(s.episodes) ? s.episodes.length : 0;
    if (n > max) max = n;
  });
  return max;
});

const pickEpisodeByUrlAcrossPans = (targetId) => {
  const wanted = String(targetId || '').trim();
  if (!wanted) return null;
  if (smartListAvailable.value) {
    const episodes = Array.isArray(smartListEpisodes.value) ? smartListEpisodes.value : [];
    for (let i = 0; i < episodes.length; i += 1) {
      const ep = episodes[i];
      const url = ep && ep.url != null ? String(ep.url) : '';
      if (!url) continue;
      if (url === wanted || url.includes(wanted) || wanted.includes(url)) {
        return { panKey: SMART_PAN_KEY, index: i };
      }
    }
  }
  const list = panOptions.value;
  for (const pan of list) {
    const episodes = pan && Array.isArray(pan.episodes) ? pan.episodes : [];
    for (let i = 0; i < episodes.length; i += 1) {
      const ep = episodes[i];
      const url = ep && ep.url != null ? String(ep.url) : '';
      if (!url) continue;
      if (url === wanted || url.includes(wanted) || wanted.includes(url)) {
        return { panKey: pan.key, index: i };
      }
    }
  }
  return null;
};

const selectedPanLabel = computed(() => {
  if (introLoading.value) return '加载中...';
  if (selectedPanKey.value === SMART_PAN_KEY && smartListAvailable.value) return SMART_PAN_LABEL;
  const list = panOptions.value;
  if (!list.length) return smartListAvailable.value ? SMART_PAN_LABEL : '暂无数据';
  const found = list.find((o) => o && o.key === selectedPanKey.value);
  return (found && found.label ? String(found.label) : list[0].label) || '暂无数据';
});

const preferBaiduPanKey = computed(() => {
  const list = panOptions.value;
  if (!list.length) return '';
  const idx = list.findIndex((o) => o && typeof o.label === 'string' && o.label.includes('百度'));
  return idx >= 0 ? list[idx].key : '';
});

const PAN_PREF_STORAGE_PREFIX = 'meowfilm_pan_pref::';
const normalizeContentKeyForPanPref = (s) => {
  const raw = typeof s === 'string' ? s : String(s || '');
  return raw.trim().toLowerCase().replace(/\s+/g, '');
};
const normalizePanLabelForPanPref = (label) => {
  return String(label || '').trim().replace(/#\d{1,3}\s*$/i, '').trim().toLowerCase();
};
const panPrefStorageKey = computed(() => {
  const k = normalizeContentKeyForPanPref(displayTitle.value);
  return k ? `${PAN_PREF_STORAGE_PREFIX}${k}` : '';
});
const readPanPref = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return '';
    const key = panPrefStorageKey.value;
    if (!key) return '';
    return String(window.localStorage.getItem(key) || '').trim().toLowerCase();
  } catch (_e) {
    return '';
  }
};
const writePanPref = (value) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const key = panPrefStorageKey.value;
    if (!key) return;
    const v = String(value || '').trim().toLowerCase();
    if (!v) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, v);
  } catch (_e) {}
};
const findPanKeyByPrefLabel = (prefLabel) => {
  const wanted = String(prefLabel || '').trim().toLowerCase();
  if (!wanted) return '';
  const list = panOptions.value;
  for (let i = 0; i < list.length; i += 1) {
    const it = list[i];
    const label = it && it.label ? normalizePanLabelForPanPref(it.label) : '';
    if (label && label === wanted) return it.key || '';
  }
  return '';
};

const EP_VIEW_MODE_STORAGE_PREFIX = 'meowfilm_episode_view_mode::';
const episodeViewModeStorageKey = computed(() => {
  const k = computeHistoryContentKey(displayTitle.value) || normalizeContentKeyForPanPref(displayTitle.value);
  return k ? `${EP_VIEW_MODE_STORAGE_PREFIX}${k}` : '';
});
const readEpisodeViewMode = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return '';
    const key = episodeViewModeStorageKey.value;
    if (!key) return '';
    const v = String(window.localStorage.getItem(key) || '').trim().toLowerCase();
    if (v === 'raw' || v === 'episodes') return v;
    return '';
  } catch (_e) {
    return '';
  }
};
const writeEpisodeViewMode = (mode) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const key = episodeViewModeStorageKey.value;
    if (!key) return;
    const v = String(mode || '').trim().toLowerCase();
    if (v !== 'raw' && v !== 'episodes') {
      window.localStorage.removeItem(key);
      return;
    }
    window.localStorage.setItem(key, v);
  } catch (_e) {}
};

watch(
  () => `${isIos.value ? '1' : '0'}|${panOptions.value.length}|${selectedPan.value}`,
  () => {
    if (!isIos.value) return;
    if (selectedPan.value) return;
    const k = preferBaiduPanKey.value;
    if (k) selectedPan.value = k;
  },
  { immediate: true }
);

const toggleRawList = (e) => {
  rawListMode.value = !rawListMode.value;
  autoRawListMode.value = false;
  if (!forceRawListMode.value) {
    writeEpisodeViewMode(rawListMode.value ? 'raw' : 'episodes');
    viewModeTouchedKey.value = episodeViewModeStorageKey.value || '';
  }
  try {
    if (e && e.currentTarget && typeof e.currentTarget.blur === 'function') e.currentTarget.blur();
  } catch (_e) {}
};

const selectPan = (key) => {
  const k = typeof key === 'string' ? key : '';
  if (!k) return;
  if (k === SMART_PAN_KEY && !smartListAvailable.value) return;
  // Keep the current episode list view mode when switching pan source.
  // If the user is currently in raw list mode, treat the switch as an explicit choice and stop auto-toggling.
  if (rawListMode.value) autoRawListMode.value = false;
  selectedPan.value = k;
  panDropdownOpen.value = false;
  selectedEpisodeGroup.value = '';

  if (k === SMART_PAN_KEY) {
    writePanPref(SMART_PAN_KEY);
  } else {
    const src = panOptions.value.find((o) => o && o.key === k) || null;
    const labelNorm = src && src.label ? normalizePanLabelForPanPref(String(src.label)) : '';
    if (labelNorm) writePanPref(labelNorm);
  }

  if (playingPanKey.value && playingPanKey.value === k && playingEpisodeIndex.value >= 0) {
    const src =
      k === SMART_PAN_KEY
        ? { label: SMART_PAN_LABEL, episodes: Array.isArray(smartListEpisodes.value) ? smartListEpisodes.value : [] }
        : (panOptions.value.find((o) => o && o.key === k) || null);
    const total = src && Array.isArray(src.episodes) ? src.episodes.length : 0;
    if (total && playingEpisodeIndex.value < total) {
      selectedEpisodeIndex.value = playingEpisodeIndex.value;
      return;
    }
  }
  selectedEpisodeIndex.value = -1;
};

const selectedPanSource = computed(() => {
  if (selectedPanKey.value === SMART_PAN_KEY && smartListAvailable.value) {
    return { key: SMART_PAN_KEY, label: SMART_PAN_LABEL, episodes: smartListEpisodes.value || [], smart: true };
  }
  const list = panOptions.value;
  if (!list.length) return null;
  const k = selectedPanKey.value;
  return list.find((o) => o && o.key === k) || list[0] || null;
});

const selectedEpisodes = computed(() => {
  const src = selectedPanSource.value;
  return src && Array.isArray(src.episodes) ? src.episodes : [];
});

const extractRawNamesFromEpisodeUrl = (episodeUrl) => {
  const raw = typeof episodeUrl === 'string' ? episodeUrl : '';
  if (!raw) return [];
  if (!raw.includes('***')) return [];
  const last = raw.split('***').pop();
  return String(last || '')
    .split('#')
    .map((s) => String(s || '').trim())
    .filter(Boolean);
};

const magicEpisodeRules = computed(() => {
  const list = props.bootstrap && props.bootstrap.settings && Array.isArray(props.bootstrap.settings.magicEpisodeRules)
    ? props.bootstrap.settings.magicEpisodeRules
    : [];
  return list
    .map((x) => (typeof x === 'string' ? x.trim() : ''))
    .filter(Boolean);
});

const magicMovieRules = computed(() => {
  const listRaw = props.bootstrap?.settings?.magicMovieRules;
  const list = Array.isArray(listRaw) ? listRaw : [];
  return list
    .map((x) => (typeof x === 'string' ? x.trim() : ''))
    .filter(Boolean);
});

const magicEpisodeCleanRegexRules = computed(() => {
  const listRaw = props.bootstrap?.settings?.magicEpisodeCleanRegexRules;
  if (Array.isArray(listRaw)) {
    return listRaw.map((x) => (typeof x === 'string' ? x.trim() : '')).filter(Boolean);
  }
  return [];
});

const magicAggregateRegexRules = computed(() => {
  const listRaw = props.bootstrap?.settings?.magicAggregateRegexRules;
  const list = Array.isArray(listRaw) ? listRaw : [];
  return list
    .map((x) => (typeof x === 'string' ? x.trim() : ''))
    .filter(Boolean);
});

// Users often paste patterns that contain doubled backslashes like `\\d` (from JSON/JS literals).
// Normalize common escapes: treat `\\d` as `\d`, `\\[` as `\[`, etc.
const normalizeRegexText = (text) => {
  const raw = typeof text === 'string' ? text : '';
  if (!raw) return '';
  return raw.replace(/\\\\(?=[dDsSwWbB.()[\]{}+*?^$|\\\-_/])/g, '\\');
};

const compiledMagicEpisodeCleanRegexRules = computed(() => {
  const list = Array.isArray(magicEpisodeCleanRegexRules.value) ? magicEpisodeCleanRegexRules.value : [];
  if (!list.length) return [];

  const compile = (pattern, flags) => {
    const p = typeof pattern === 'string' ? pattern : '';
    if (!p) return null;
    const f = typeof flags === 'string' ? flags : '';
    const withGlobal = f.includes('g') ? f : `${f}g`;
    try {
      return new RegExp(normalizeRegexText(p), withGlobal || 'g');
    } catch (_e) {
      return null;
    }
  };

  return list
    .map((raw) => {
      const s = typeof raw === 'string' ? raw.trim() : '';
      if (!s) return null;
      const asLiteral = s.startsWith('/') && s.lastIndexOf('/') > 0;
      if (asLiteral) {
        const last = s.lastIndexOf('/');
        const pattern = s.slice(1, last);
        const flags = s.slice(last + 1) || 'i';
        return compile(pattern, flags);
      }
      return compile(s, 'i');
    })
    .filter(Boolean);
});

const compiledMagicAggregateRegexRules = computed(() => {
  const list = Array.isArray(magicAggregateRegexRules.value) ? magicAggregateRegexRules.value : [];
  if (!list.length) return [];

  const compile = (pattern, flags) => {
    const p = typeof pattern === 'string' ? pattern : '';
    if (!p) return null;
    const f = typeof flags === 'string' ? flags : '';
    const withGlobal = f.includes('g') ? f : `${f}g`;
    try {
      return new RegExp(normalizeRegexText(p), withGlobal || 'g');
    } catch (_e) {
      return null;
    }
  };

  return list
    .map((raw) => {
      const s = typeof raw === 'string' ? raw.trim() : '';
      if (!s) return null;
      const asLiteral = s.startsWith('/') && s.lastIndexOf('/') > 0;
      if (asLiteral) {
        const last = s.lastIndexOf('/');
        const pattern = s.slice(1, last);
        const flags = s.slice(last + 1) || 'i';
        return compile(pattern, flags);
      }
      return compile(s, 'i');
    })
    .filter(Boolean);
});

const compileMagicRule = (ruleText) => {
  const raw = typeof ruleText === 'string' ? ruleText.trim() : '';
  if (!raw) return null;

  const compileRegex = (pattern, flags) => {
    const p = typeof pattern === 'string' ? pattern : '';
    if (!p) return null;
    const f = typeof flags === 'string' && flags ? flags : 'i';
    try {
      return new RegExp(p, f);
    } catch (_e) {
      return null;
    }
  };

  // Allow JSON rule strings like:
  //   {"pattern":"...","replace":"...","flags":"i"}
  // `replace` can use `\\1` (python-style) and will be normalized to `$1` for JS.
  if (raw.startsWith('{') && raw.endsWith('}')) {
    try {
      const obj = JSON.parse(raw);
      if (obj && typeof obj === 'object' && typeof obj.pattern === 'string') {
        const re = compileRegex(obj.pattern, obj.flags);
        if (!re) return null;
        const replaceRaw = typeof obj.replace === 'string' ? obj.replace : '';
        const replace = replaceRaw ? replaceRaw.replace(/\\(\d+)/g, '$$$1') : '';
        return { re, replace };
      }
    } catch (_e) {
      // fall through
    }
  }

  const asLiteral = raw.startsWith('/') && raw.lastIndexOf('/') > 0;
  if (asLiteral) {
    const last = raw.lastIndexOf('/');
    const pattern = raw.slice(1, last);
    const flags = raw.slice(last + 1);
    const re = compileRegex(pattern, flags);
    return re ? { re, replace: '' } : null;
  }

  const re = compileRegex(raw, 'i');
  return re ? { re, replace: '' } : null;
};

const compiledMagicEpisodeRules = computed(() => {
  return magicEpisodeRules.value.map(compileMagicRule).filter(Boolean);
});

const compiledMagicMovieRules = computed(() => {
  return magicMovieRules.value.map(compileMagicRule).filter(Boolean);
});

const hasMagicEpisodeRules = computed(() => compiledMagicEpisodeRules.value.length > 0);

const smartSourcePriorityTokensSetting = computed(() => {
  const list = props.bootstrap?.settings?.smartSourcePriorityTokens;
  if (!Array.isArray(list)) return [];
  return list.map((x) => (typeof x === 'string' ? x.trim() : '')).filter(Boolean);
});

const smartPanMatchTokensSetting = computed(() => {
  const list = props.bootstrap?.settings?.smartPanMatchTokens;
  if (!Array.isArray(list)) return [];
  return list.map((x) => (typeof x === 'string' ? x.trim() : '')).filter(Boolean);
});

const smartPanExtractModeSetting = computed(() => {
  const raw = props.bootstrap?.settings?.smartPanExtractMode;
  return raw === 'pan-first' ? 'pan-first' : 'rule-first';
});

const compiledSmartSourcePriorityTokens = computed(() => {
  const list = Array.isArray(smartSourcePriorityTokensSetting.value) ? smartSourcePriorityTokensSetting.value : [];
  const out = [];
  const seen = new Set();
  list.forEach((t) => {
    const s = typeof t === 'string' ? t.trim() : '';
    if (!s) return;
    const key = s.toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(key);
  });
  return out;
});

const compiledSmartPanMatchTokens = computed(() => {
  const list = Array.isArray(smartPanMatchTokensSetting.value) ? smartPanMatchTokensSetting.value : [];
  const out = [];
  const seen = new Set();
  list.forEach((t) => {
    const s = typeof t === 'string' ? t.trim() : '';
    if (!s) return;
    const key = s.toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(key);
  });
  return out;
});

const STRONG_SERIES_RE_S_E = /\bS\d{1,2}\s*E\d{1,4}\b/i;
const STRONG_SERIES_RE_CN = /第\s*(?:\d{1,4}|[一二三四五六七八九十百千两零〇]{1,8})\s*(?:集|话|回|期)/;
const STRONG_SERIES_RE_EP = /\b(?:EP|E)\s*\d{1,4}\b/i;

const extractEpisodeCandidateTexts = (ep) => {
  const out = [];
  if (ep && ep.name != null) {
    const s = String(ep.name || '').trim();
    if (s) out.push(s);
  }
  if (ep && ep.url != null) {
    const rawNames = extractRawNamesFromEpisodeUrl(String(ep.url || ''));
    rawNames.forEach((n) => {
      const s = String(n || '').trim();
      if (s) out.push(s);
    });
  }
  return out;
};

const hasStrongSeriesEvidence = (text) => {
  const s = typeof text === 'string' ? text.trim() : '';
  if (!s) return false;
  return STRONG_SERIES_RE_S_E.test(s) || STRONG_SERIES_RE_CN.test(s) || STRONG_SERIES_RE_EP.test(s);
};

const matchesAnyMagicRule = (text, rules) => {
  const s = typeof text === 'string' ? text.trim() : '';
  const list = Array.isArray(rules) ? rules : [];
  if (!s || !list.length) return false;
  for (let i = 0; i < list.length; i += 1) {
    const re = list[i] && list[i].re ? list[i].re : null;
    if (!re) continue;
    try {
      if (re.global || re.sticky) re.lastIndex = 0;
    } catch (_e) {}
    if (re.test(s)) return true;
  }
  return false;
};

const contentKind = computed(() => {
  const pans = panOptions.value;
  if (!Array.isArray(pans) || !pans.length) return 'unknown';

  const maxPerPan = 20;
  const maxTotal = 80;
  let seen = 0;

  for (let p = 0; p < pans.length && seen < maxTotal; p += 1) {
    const eps = pans[p] && Array.isArray(pans[p].episodes) ? pans[p].episodes : [];
    const take = Math.min(maxPerPan, eps.length);
    for (let i = 0; i < take && seen < maxTotal; i += 1) {
      const ep = eps[i];
      const candidates = extractEpisodeCandidateTexts(ep);
      if (candidates.some(hasStrongSeriesEvidence)) return 'series';
      seen += 1;
    }
  }

  // If it's a single-pan source with many items, prefer "unknown" so we can
  // fall back to episode extraction (unknown>10) instead of being classified as movie
  // by a single "year-style" filename mixed into a mostly-numeric list.
  if (pans.length === 1 && maxPanEpisodeCount.value > 10) return 'unknown';

  const movieRules = compiledMagicMovieRules.value;
  if (Array.isArray(movieRules) && movieRules.length) {
    seen = 0;
    for (let p = 0; p < pans.length && seen < maxTotal; p += 1) {
      const eps = pans[p] && Array.isArray(pans[p].episodes) ? pans[p].episodes : [];
      const take = Math.min(maxPerPan, eps.length);
      for (let i = 0; i < take && seen < maxTotal; i += 1) {
        const ep = eps[i];
        const candidates = extractEpisodeCandidateTexts(ep);
        if (candidates.some((t) => matchesAnyMagicRule(t, movieRules))) return 'movie';
        seen += 1;
      }
    }
  }

  return 'unknown';
});

function computeHistoryContentKey(title) {
  const raw = typeof title === 'string' ? title : String(title || '');
  if (!raw) return '';
  const rules = compiledMagicAggregateRegexRules.value;
  let out = raw;
  if (Array.isArray(rules) && rules.length) {
    rules.forEach((re) => {
      if (!re) return;
      try {
        if (re.global || re.sticky) re.lastIndex = 0;
      } catch (_e) {}
      try {
        out = out.replace(re, '');
      } catch (_e) {}
    });
  }
  return normalizeForAggKey(out);
}

const forceRawListMode = computed(() => {
  if (contentKind.value === 'movie') return true;
  return false;
});

watch(
  () => `${contentKind.value}|${forceRawListMode.value ? '1' : '0'}`,
  () => {
    if (!forceRawListMode.value) return;
    rawListMode.value = true;
    autoRawListMode.value = false;
  },
  { immediate: true }
);

const computePriorityMatch = (textLower, tokensLower) => {
  const text = typeof textLower === 'string' ? textLower : '';
  const tokens = Array.isArray(tokensLower) ? tokensLower : [];
  const indices = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const t = tokens[i];
    if (!t) continue;
    if (text.includes(t)) indices.push(i);
  }
  return { count: indices.length, indices };
};

const comparePriorityMatch = (a, b) => {
  const ac = a && Number.isFinite(Number(a.count)) ? Number(a.count) : 0;
  const bc = b && Number.isFinite(Number(b.count)) ? Number(b.count) : 0;
  if (ac !== bc) return bc - ac; // more matches first
  const ai = a && Array.isArray(a.indices) ? a.indices : [];
  const bi = b && Array.isArray(b.indices) ? b.indices : [];
  const n = Math.min(ai.length, bi.length);
  for (let i = 0; i < n; i += 1) {
    const av = Number(ai[i]);
    const bv = Number(bi[i]);
    if (av !== bv) return av - bv; // earlier token first
  }
  return ai.length - bi.length;
};

const cleanMagicEpisodeText = (text, cleanRules) => {
  const s = typeof text === 'string' ? text.trim() : '';
  if (!s || !Array.isArray(cleanRules) || !cleanRules.length) return s;
  try {
    let out = s;
    cleanRules.forEach((re) => {
      if (!re) return;
      out = out.replace(re, '');
    });
    return out.replace(/\s+/g, ' ').trim();
  } catch (_e) {
    return s;
  }
};

const parseChineseNumeralToInt = (text) => {
  const raw = typeof text === 'string' ? text : String(text || '');
  const s = raw.replace(/\s+/g, '').replace(/两/g, '二').replace(/〇/g, '零');
  if (!s) return 0;

  const digit = (ch) => {
    switch (ch) {
      case '零':
        return 0;
      case '一':
        return 1;
      case '二':
        return 2;
      case '三':
        return 3;
      case '四':
        return 4;
      case '五':
        return 5;
      case '六':
        return 6;
      case '七':
        return 7;
      case '八':
        return 8;
      case '九':
        return 9;
      default:
        return -1;
    }
  };

  const parseSection = (sec) => {
    let total = 0;
    let num = 0;
    for (let i = 0; i < sec.length; i += 1) {
      const ch = sec[i];
      const d = digit(ch);
      if (d >= 0) {
        num = d;
        continue;
      }
      let unit = 0;
      if (ch === '十') unit = 10;
      else if (ch === '百') unit = 100;
      else if (ch === '千') unit = 1000;
      else if (ch === '零') unit = 0;
      else return NaN;

      if (!unit) continue;
      if (!num) num = 1;
      total += num * unit;
      num = 0;
    }
    return total + num;
  };

  if (s.includes('万')) {
    const parts = s.split('万');
    if (!parts.length || parts.length > 2) return 0;
    const left = parts[0] || '';
    const right = parts[1] || '';
    const a = left ? parseSection(left) : 0;
    const b = right ? parseSection(right) : 0;
    if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
    const n = a * 10000 + b;
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
  }

  const n = parseSection(s);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
};

const extractSeasonEpisodeFromText = (text, rules, cleanRules) => {
  const s = cleanMagicEpisodeText(text, cleanRules);
  if (!s || !Array.isArray(rules) || !rules.length) return { season: 0, episode: 0 };
  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i];
    const re = rule && rule.re ? rule.re : null;
    if (!re) continue;
    const m = s.match(re);
    if (!m) continue;

    if (rule && rule.replace) {
      let normalized = '';
      try {
        normalized = s.replace(re, rule.replace);
      } catch (_e) {
        normalized = '';
      }
      const mm = normalized.match(/(?:S(\d{1,2}))?\s*E(\d{1,3})/i);
      if (mm && mm[2]) {
        const seasonRaw = mm[1] ? Number.parseInt(String(mm[1]), 10) : 0;
        const episodeRaw = Number.parseInt(String(mm[2]), 10);
        const season = Number.isFinite(seasonRaw) && seasonRaw >= 0 && seasonRaw <= 99 ? seasonRaw : 0;
        const episode = Number.isFinite(episodeRaw) && episodeRaw >= 1 && episodeRaw <= 99999 ? episodeRaw : 0;
        if (episode) return { season, episode };
      }
    }

    const seasonFrom = (val) => {
      const ss = typeof val === 'string' ? val : String(val || '');
      const sm = ss.match(/S(\d{1,2})/i);
      if (!sm || !sm[1]) return 0;
      const n = Number.parseInt(String(sm[1]), 10);
      return Number.isFinite(n) && n >= 0 && n <= 99 ? n : 0;
    };
    const picked =
      (m.length > 2 && m[2] != null ? String(m[2]) : '') ||
      (m.length > 1 && m[1] != null ? String(m[1]) : '') ||
      String(m[0] || '');
    const season = seasonFrom(m.length > 1 ? m[1] : '') || seasonFrom(picked) || seasonFrom(m[0] || '') || 0;
    const digits = String(picked || '').trim().replace(/\D+/g, '');
    if (digits) {
      const episode = Number.parseInt(digits, 10);
      if (Number.isFinite(episode) && episode >= 1 && episode <= 99999) return { season, episode };
      continue;
    }

    const cn = String(picked || '').match(/第\s*([一二三四五六七八九十百千两零〇万]{1,16})\s*(?:集|话|回|期)/);
    if (!cn || !cn[1]) continue;
    const episode = parseChineseNumeralToInt(cn[1]);
    if (Number.isFinite(episode) && episode >= 1 && episode <= 99999) return { season, episode };
  }
  return { season: 0, episode: 0 };
};

const extractSeasonEpisodeFromCandidates = (candidates, rules, cleanRules) => {
  const list = Array.isArray(candidates) ? candidates : [];
  for (let i = 0; i < list.length; i += 1) {
    const r = extractSeasonEpisodeFromText(list[i], rules, cleanRules);
    if (r && r.episode) return r;
  }
  return { season: 0, episode: 0 };
};

const smartPanEpisodes = computed(() => {
  if (!hasMagicEpisodeRules.value) return [];

  const panTokenOrder = compiledSmartPanMatchTokens.value;
  if (!Array.isArray(panTokenOrder) || panTokenOrder.length < 2) return [];

  const rawPans = panOptions.value;
  if (!Array.isArray(rawPans) || rawPans.length < 2) return [];

  const qualityOrder = compiledSmartSourcePriorityTokens.value;
  const mode = smartPanExtractModeSetting.value;

  const labelTokenIdxOf = (label) => {
    const s = typeof label === 'string' ? label.trim().toLowerCase() : '';
    if (!s) return -1;
    for (let i = 0; i < panTokenOrder.length; i += 1) {
      const t = panTokenOrder[i];
      if (t && s.includes(t)) return i;
    }
    return -1;
  };

  const candidatePans = [];
  const tokenSet = new Set();
  rawPans.forEach((pan) => {
    if (!pan || !pan.label || !Array.isArray(pan.episodes) || !pan.episodes.length) return;
    const idx = labelTokenIdxOf(pan.label);
    if (idx < 0) return;
    tokenSet.add(idx);
    candidatePans.push({ pan, tokenIdx: idx });
  });
  if (tokenSet.size < 2) return [];

  const parseExplicitSeason = (text) => {
    const s = typeof text === 'string' ? text.trim() : '';
    if (!s) return { has: false, season: 0, special: false, s1: false, s2p: false };
    const m = s.match(/S(\d{1,2})\s*E(\d{1,5})/i);
    if (!m || !m[1]) return { has: false, season: 0, special: false, s1: false, s2p: false };
    const n = Number.parseInt(String(m[1]), 10);
    const season = Number.isFinite(n) && n >= 0 && n <= 99 ? n : 0;
    return {
      has: true,
      season,
      special: season === 0,
      s1: season === 1,
      s2p: season >= 2,
    };
  };

  const rules = compiledMagicEpisodeRules.value;
  const cleanRules = compiledMagicEpisodeCleanRegexRules.value;
  if (!Array.isArray(rules) || !rules.length) return [];

  const candidates = [];
  const matchSeasonSet = new Set();
  let hasExplicitSeason1 = false;
  let hasExplicitSeason2Plus = false;
  let hasExplicitSpecialSeason0 = false;

  candidatePans.forEach(({ pan, tokenIdx }) => {
    const eps = Array.isArray(pan.episodes) ? pan.episodes : [];
    eps.forEach((ep, index) => {
      if (!ep || !ep.url) return;
      const url = String(ep.url || '').trim();
      if (!url) return;
      const name = ep && ep.name != null ? String(ep.name) : '';
      const rawNames = extractRawNamesFromEpisodeUrl(url);
      const rawText = (rawNames[0] || name || '').trim();
      const rawTextLower = rawText.toLowerCase();

      const match = extractSeasonEpisodeFromCandidates([name, rawText].filter(Boolean), rules, cleanRules);
      const episodeNo = match && Number.isFinite(Number(match.episode)) ? Math.floor(Number(match.episode)) : 0;
      if (episodeNo <= 0) return;
      const seasonNo = match && Number.isFinite(Number(match.season)) ? Math.floor(Number(match.season)) : 0;
      if (seasonNo > 0) matchSeasonSet.add(seasonNo);

      const explicit = parseExplicitSeason(rawText);
      if (explicit.s1) hasExplicitSeason1 = true;
      if (explicit.s2p) hasExplicitSeason2Plus = true;
      if (explicit.special) hasExplicitSpecialSeason0 = true;

      candidates.push({
        tokenIdx,
        panLabel: String(pan.label || '').trim(),
        index,
        ep,
        matchSeason: seasonNo,
        explicitSeason: explicit.has ? explicit.season : null,
        explicitSeasonHas: explicit.has,
        episodeNo,
        priority: computePriorityMatch(rawTextLower, qualityOrder),
        rawTextLower,
      });
    });
  });
  if (!candidates.length) return [];

  const multiSeason = matchSeasonSet.size >= 2 || hasExplicitSeason2Plus || (hasExplicitSpecialSeason0 && hasExplicitSeason1);

  const byKey = new Map();
  candidates.forEach((c) => {
    const episodeNo = c.episodeNo;
    if (!episodeNo) return;

    if (!multiSeason) {
      const key = `E${episodeNo}`;
      const list = byKey.get(key) || [];
      list.push({ ...c, key, seasonForKey: 0, episodeForKey: episodeNo });
      byKey.set(key, list);
      return;
    }

    // Multi-season: require an explicit season marker or a non-zero extracted season.
    const seasonPicked =
      c.matchSeason > 0
        ? c.matchSeason
        : c.explicitSeasonHas
          ? Number(c.explicitSeason) || 0
          : 0;
    if (!seasonPicked && !c.explicitSeasonHas) return;
    const key = `S${seasonPicked}E${episodeNo}`;
    const list = byKey.get(key) || [];
    list.push({ ...c, key, seasonForKey: seasonPicked, episodeForKey: episodeNo });
    byKey.set(key, list);
  });

  const pickBest = (list) => {
    if (!Array.isArray(list) || !list.length) return null;
    if (mode === 'pan-first') {
      for (let tIdx = 0; tIdx < panTokenOrder.length; tIdx += 1) {
        const group = list.filter((it) => it && it.tokenIdx === tIdx);
        if (!group.length) continue;
        group.sort((a, b) => {
          const q = comparePriorityMatch(a && a.priority, b && b.priority);
          if (q) return q;
          return a.index - b.index;
        });
        return group[0] || null;
      }
      return null;
    }

    // rule-first
    const sorted = list.slice().sort((a, b) => {
      const q = comparePriorityMatch(a && a.priority, b && b.priority);
      if (q) return q;
      if (a.tokenIdx !== b.tokenIdx) return a.tokenIdx - b.tokenIdx;
      return a.index - b.index;
    });
    return sorted[0] || null;
  };

  const pad2 = (n) => String(Math.max(0, Math.min(99, Number(n) || 0))).padStart(2, '0');
  const padEp = (n) => {
    const x = Number.isFinite(Number(n)) ? Math.max(0, Math.floor(Number(n))) : 0;
    if (x <= 99) return String(x).padStart(2, '0');
    if (x <= 999) return String(x).padStart(3, '0');
    return String(x);
  };

  const chosen = [];
  byKey.forEach((list) => {
    const picked = pickBest(list);
    if (!picked || !picked.ep || !picked.ep.url) return;
    chosen.push(picked);
  });
  if (!chosen.length) return [];

  chosen.sort((a, b) => {
    if (!multiSeason) return a.episodeForKey - b.episodeForKey;
    if (a.seasonForKey !== b.seasonForKey) return a.seasonForKey - b.seasonForKey;
    return a.episodeForKey - b.episodeForKey;
  });

  return chosen.map((c) => {
    const season = multiSeason ? Number(c.seasonForKey) || 0 : 0;
    const episode = Number(c.episodeForKey) || 0;
    const name = multiSeason ? `S${pad2(season)}E${padEp(episode)}` : `第${episode}集`;
    return { ...c.ep, name };
  });
});

const smartSeriesListAvailable = computed(() => Array.isArray(smartPanEpisodes.value) && smartPanEpisodes.value.length > 0);

const normalizeMovieDedupBase = (text) => {
  const raw = typeof text === 'string' ? text : '';
  if (!raw) return '';
  let s = raw.toLowerCase();
  s = s.replace(/【[^】]*】/g, ' ');
  s = s.replace(/\[[^\]]*\]/g, ' ');
  s = s.replace(/\([^)]+\)/g, ' ');
  s = s.replace(/\.[a-z0-9]{1,6}\s*$/i, ' ');
  s = s.replace(/[._-]+/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
};

const extractMovieSignatureParts = (textLower) => {
  const s = typeof textLower === 'string' ? textLower : '';
  if (!s) return [];
  const parts = [];
  if (/\b8k\b/.test(s) || /\b4320p\b/.test(s)) parts.push('8k');
  if (/\b4k\b/.test(s) || /\b2160p\b/.test(s)) parts.push('2160p');
  if (/\b1080p\b/.test(s)) parts.push('1080p');
  if (/\b720p\b/.test(s)) parts.push('720p');
  if (/\b60\s*fps\b/.test(s) || /60\s*帧/.test(s)) parts.push('60fps');
  if (/\b120\s*fps\b/.test(s) || /120\s*帧/.test(s)) parts.push('120fps');
  if (/\b(?:x265|h\.?265|hevc)\b/.test(s)) parts.push('h265');
  if (/\b(?:x264|h\.?264|avc)\b/.test(s)) parts.push('h264');
  if (/\bhdr10\+\b/.test(s)) parts.push('hdr10+');
  else if (/\bhdr10\b/.test(s)) parts.push('hdr10');
  else if (/\bhdr\b/.test(s)) parts.push('hdr');
  if (/\b(?:dv|dolby\s*vision)\b/.test(s)) parts.push('dv');
  if (/\batmos\b/.test(s)) parts.push('atmos');
  if (/\bddp\b/.test(s)) parts.push('ddp');
  return parts;
};

const smartMovieEpisodes = computed(() => {
  if (contentKind.value !== 'movie') return [];
  const rules = compiledMagicMovieRules.value;
  if (!Array.isArray(rules) || !rules.length) return [];

  const qualityTokens = compiledSmartSourcePriorityTokens.value;
  const pans = panOptions.value;
  if (!Array.isArray(pans) || !pans.length) return [];

  const candidates = [];
  pans.forEach((pan, panIdx) => {
    const eps = pan && Array.isArray(pan.episodes) ? pan.episodes : [];
    eps.forEach((ep, index) => {
      if (!ep || !ep.url) return;
      const url = String(ep.url || '').trim();
      if (!url) return;
      const rawNames = extractRawNamesFromEpisodeUrl(url);
      const name = ep && ep.name != null ? String(ep.name) : '';
      const rawText = (rawNames[0] || name || '').trim();
      const candidatesText = extractEpisodeCandidateTexts(ep);
      if (!candidatesText.length) return;
      if (!candidatesText.some((t) => matchesAnyMagicRule(t, rules))) return;

      const rawLower = rawText.toLowerCase();
      candidates.push({
        panIdx,
        index,
        ep,
        url,
        rawText: rawText || name || url,
        rawLower: rawLower || '',
        priority: computePriorityMatch(rawLower || '', qualityTokens),
        dedupBase: normalizeMovieDedupBase(rawLower || ''),
        sig: extractMovieSignatureParts(rawLower || '').join('|'),
      });
    });
  });
  if (!candidates.length) return [];

  const better = (a, b) => {
    const q = comparePriorityMatch(a && a.priority, b && b.priority);
    if (q) return q < 0 ? a : b;
    if ((a.panIdx || 0) !== (b.panIdx || 0)) return (a.panIdx || 0) < (b.panIdx || 0) ? a : b;
    return (a.index || 0) <= (b.index || 0) ? a : b;
  };

  const byUrl = new Map();
  candidates.forEach((c) => {
    const k = c.url;
    const prev = byUrl.get(k);
    byUrl.set(k, prev ? better(prev, c) : c);
  });

  const byKey = new Map();
  Array.from(byUrl.values()).forEach((c) => {
    const key = `${c.dedupBase || ''}::${c.sig || ''}`;
    const prev = byKey.get(key);
    byKey.set(key, prev ? better(prev, c) : c);
  });

  const out = Array.from(byKey.values());
  out.sort((a, b) => {
    const q = comparePriorityMatch(a && a.priority, b && b.priority);
    if (q) return q;
    if ((a.panIdx || 0) !== (b.panIdx || 0)) return (a.panIdx || 0) - (b.panIdx || 0);
    return (a.index || 0) - (b.index || 0);
  });

  return out.map((c) => {
    const ep = c && c.ep ? c.ep : {};
    const name = c && c.rawText ? c.rawText : (ep && ep.name != null ? String(ep.name) : '');
    return { ...ep, name };
  });
});

const smartListEpisodes = computed(() => {
  if (contentKind.value === 'movie') return smartMovieEpisodes.value;
  return smartPanEpisodes.value;
});

const smartListAvailable = computed(() => {
  if (contentKind.value === 'movie') return Array.isArray(smartMovieEpisodes.value) && smartMovieEpisodes.value.length > 0;
  return smartSeriesListAvailable.value;
});

const parseLooseSeasonEpisodeFromText = (text) => {
  const s = typeof text === 'string' ? text.trim() : '';
  if (!s) return { season: 0, episode: 0 };

  const se = s.match(/(?:S(\d{1,2}))?\s*E(\d{1,5})/i);
  if (se && se[2]) {
    const seasonRaw = se[1] ? Number.parseInt(String(se[1]), 10) : 0;
    const episodeRaw = Number.parseInt(String(se[2]), 10);
    const season = Number.isFinite(seasonRaw) && seasonRaw >= 0 && seasonRaw <= 99 ? seasonRaw : 0;
    const episode = Number.isFinite(episodeRaw) && episodeRaw >= 1 && episodeRaw <= 99999 ? episodeRaw : 0;
    if (episode) return { season, episode };
  }

  const cn = s.match(/第\s*(\d{1,5})\s*(?:集|话|回)/);
  if (cn && cn[1]) {
    const episode = Number.parseInt(String(cn[1]), 10);
    if (Number.isFinite(episode) && episode >= 1 && episode <= 99999) return { season: 0, episode };
  }

  const ep = s.match(/(?:ep|episode|e)\s*(\d{1,5})/i);
  if (ep && ep[1]) {
    const episode = Number.parseInt(String(ep[1]), 10);
    if (Number.isFinite(episode) && episode >= 1 && episode <= 99999) return { season: 0, episode };
  }

  const groups = s.match(/\d{1,5}/g) || [];
  if (!groups.length) return { season: 0, episode: 0 };
  for (let i = groups.length - 1; i >= 0; i -= 1) {
    const n = Number.parseInt(String(groups[i]), 10);
    if (!Number.isFinite(n) || n <= 0 || n > 99999) continue;
    if (n >= 1900 && n <= 2100) continue;
    return { season: 0, episode: n };
  }
  return { season: 0, episode: 0 };
};

// For magic matching:
// - raw list ALWAYS shows all episodes (no filtering)
// - episode buttons ONLY show episodes that match a rule (extracting season/episode)
const episodeMatchByIndex = computed(() => {
  const eps = selectedEpisodes.value;
  if (!eps.length) return [];
  const rules = compiledMagicEpisodeRules.value;
  if (!rules.length) return eps.map((_ep, idx) => ({ season: 0, episode: idx + 1 }));
  const cleanRules = compiledMagicEpisodeCleanRegexRules.value;

  return eps.map((ep, idx) => {
    const candidates = [];
    if (ep && ep.name != null) candidates.push(String(ep.name));
    if (ep && ep.url != null) {
      const rawNames = extractRawNamesFromEpisodeUrl(String(ep.url));
      if (rawNames[0]) candidates.push(rawNames[0]);
    }
    return extractSeasonEpisodeFromCandidates(candidates, rules, cleanRules);
  });
});

const pickResumeEpisodeIndex = ({ wantedSeason = 0, wantedEpisode = 0, wantedIndex = 0 } = {}) => {
  const eps = selectedEpisodes.value;
  const total = Array.isArray(eps) ? eps.length : 0;
  if (!total) return 0;

  const idxRaw = Number.isFinite(Number(wantedIndex)) ? Math.floor(Number(wantedIndex)) : 0;
  const idxFallback = Math.max(0, Math.min(idxRaw, total - 1));

  const desiredEpisodeRaw = Number.isFinite(Number(wantedEpisode)) ? Math.floor(Number(wantedEpisode)) : 0;
  const desiredEpisode = desiredEpisodeRaw > 0 ? desiredEpisodeRaw : 0;
  if (!desiredEpisode) return idxFallback;

  const desiredSeasonRaw = Number.isFinite(Number(wantedSeason)) ? Math.floor(Number(wantedSeason)) : 0;
  const desiredSeason = desiredSeasonRaw > 0 ? desiredSeasonRaw : 0;

  const matches = episodeMatchByIndex.value;
  const list = Array.isArray(matches) ? matches : [];

  const pickFromMatches = (seasonConstraint) => {
    let bestBelow = null; // { epNo, idx }
    let bestAbove = null; // { epNo, idx }
    for (let i = 0; i < list.length; i += 1) {
      const m = list[i];
      const epNo = m && Number.isFinite(Number(m.episode)) ? Math.floor(Number(m.episode)) : 0;
      if (epNo <= 0) continue;
      const seasonNo = m && Number.isFinite(Number(m.season)) ? Math.floor(Number(m.season)) : 0;
      if (seasonConstraint > 0 && seasonNo !== seasonConstraint) continue;

      if (epNo <= desiredEpisode) {
        if (!bestBelow || epNo > bestBelow.epNo) bestBelow = { epNo, idx: i };
      } else {
        if (!bestAbove || epNo < bestAbove.epNo) bestAbove = { epNo, idx: i };
      }
    }
    if (bestBelow) return bestBelow.idx;
    if (bestAbove) return bestAbove.idx;
    return null;
  };

  const picked = pickFromMatches(desiredSeason);
  if (picked != null) return picked;
  const pickedAnySeason = pickFromMatches(0);
  if (pickedAnySeason != null) return pickedAnySeason;
  return idxFallback;
};

const normalizeEpisodeNameForExactMatch = (name) => {
  const s = typeof name === 'string' ? name : String(name || '');
  return s.trim().replace(/\s+/g, ' ').toLowerCase();
};

const pickExactResumeEpisodeIndexFromName = (episodeName, cleanRules) => {
  const want = normalizeEpisodeNameForExactMatch(episodeName);
  if (!want) return null;
  const eps = selectedEpisodes.value;
  const total = Array.isArray(eps) ? eps.length : 0;
  if (!total) return null;

  const candidatesOf = (ep) => {
    const out = [];
    if (ep && ep.name != null) out.push(String(ep.name));
    if (ep && ep.url != null) {
      const rawNames = extractRawNamesFromEpisodeUrl(String(ep.url));
      rawNames.forEach((n) => {
        if (n) out.push(String(n));
      });
    }
    return out;
  };

  // Pass 1: strict normalized equality.
  for (let idx = 0; idx < eps.length; idx += 1) {
    const list = candidatesOf(eps[idx]);
    for (let i = 0; i < list.length; i += 1) {
      if (normalizeEpisodeNameForExactMatch(list[i]) === want) return idx;
    }
  }

  // Pass 2: equality after applying user's clean regex rules (best-effort).
  const wantClean = normalizeEpisodeNameForExactMatch(cleanMagicEpisodeText(episodeName, cleanRules));
  if (wantClean) {
    for (let idx = 0; idx < eps.length; idx += 1) {
      const list = candidatesOf(eps[idx]);
      for (let i = 0; i < list.length; i += 1) {
        const candClean = normalizeEpisodeNameForExactMatch(cleanMagicEpisodeText(list[i], cleanRules));
        if (candClean === wantClean) return idx;
      }
    }
  }

  return null;
};

const allDisplayedEpisodes = computed(() => {
  const eps = selectedEpisodes.value;
  const total = eps.length;
  if (!total) return [];
  const matches = episodeMatchByIndex.value;
  const hasMagic = hasMagicEpisodeRules.value;

  const items = [];
  let unmatchedCount = 0;
  for (let idx = 0; idx < eps.length; idx += 1) {
    const ep = eps[idx];
    const url = (ep && ep.url ? String(ep.url) : '').trim();
    const name = (ep && ep.name ? String(ep.name) : '').trim() || `第${idx + 1}集`;
    const m = matches && matches[idx] && typeof matches[idx] === 'object' ? matches[idx] : { season: 0, episode: 0 };
    const season = Number.isFinite(Number(m.season)) ? Number(m.season) : 0;
    const no = Number.isFinite(Number(m.episode)) ? Number(m.episode) : 0;

    if (hasMagic) {
      if (!Number.isFinite(no) || no <= 0) {
        unmatchedCount += 1;
        items.push({
          key: `${idx}-${url}`,
          index: idx,
          no: 0,
          season,
          name,
          url,
          unmatched: true,
          displayNo: unmatchedCount,
        });
        continue;
      }
      items.push({ key: `${idx}-${url}`, index: idx, no, season, name, url, unmatched: false, displayNo: no });
    } else {
      items.push({ key: `${idx}-${url}`, index: idx, no: idx + 1, season: 0, name, url, unmatched: false, displayNo: idx + 1 });
    }
  }

  if (!items.length) return [];

  if (hasMagic) {
    const recognized = items.filter((it) => it && !it.unmatched && Number.isFinite(Number(it.no)) && Number(it.no) > 0);
    const unrecognized = items.filter((it) => it && it.unmatched);

    const seasonSet = new Set();
    recognized.forEach((it) => {
      const s = it && Number.isFinite(Number(it.season)) ? Number(it.season) : 0;
      if (s > 0) seasonSet.add(s);
    });
    const multipleSeasons = seasonSet.size >= 2;

    recognized.sort((a, b) => {
      const saRaw = a && Number.isFinite(Number(a.season)) ? Number(a.season) : 0;
      const sbRaw = b && Number.isFinite(Number(b.season)) ? Number(b.season) : 0;
      const sa = multipleSeasons && saRaw === 0 ? 1000 : saRaw;
      const sb = multipleSeasons && sbRaw === 0 ? 1000 : sbRaw;
      if (multipleSeasons && sa !== sb) return sa - sb;
      return a.no === b.no ? a.index - b.index : a.no - b.no;
    });
    if (episodeDescending.value) recognized.reverse();
    return recognized.concat(unrecognized);
  }

  if (!episodeDescending.value) return items;
  return items.slice().reverse();
});

watch(
  () => `${episodeViewModeStorageKey.value}|${forceRawListMode.value ? '1' : '0'}|${selectedEpisodes.value.length}`,
  () => {
    const key = episodeViewModeStorageKey.value;
    if (!key) return;
    if (forceRawListMode.value) {
      rawListMode.value = true;
      autoRawListMode.value = false;
      return;
    }
    // Don't override the current session after the user explicitly toggled.
    if (viewModeTouchedKey.value === key) return;

    const saved = readEpisodeViewMode();
    rawListMode.value = saved === 'raw';
    autoRawListMode.value = false;
  },
  { immediate: true }
);

const seasonTabs = computed(() => {
  const list = allDisplayedEpisodes.value;
  if (!list.length) return [];
  const set = new Set();
  let hasZeroSeason = false;
  let hasSpecialSeason0 = false;
  const specialRe = /S0{1,2}\s*E\d{1,5}/i;
  list.forEach((it) => {
    const s = it && Number.isFinite(Number(it.season)) ? Number(it.season) : 0;
    if (s > 0) set.add(s);
    else {
      hasZeroSeason = true;
      if (!hasSpecialSeason0) {
        const candidates = [];
        if (it && it.name != null) candidates.push(String(it.name));
        if (it && it.url != null) {
          const rawNames = extractRawNamesFromEpisodeUrl(String(it.url));
          rawNames.forEach((n) => {
            if (n) candidates.push(String(n));
          });
        }
        if (candidates.some((t) => specialRe.test(String(t || '')))) hasSpecialSeason0 = true;
      }
    }
  });
  const seasons = Array.from(set).sort((a, b) => a - b);
  if (seasons.length < 2 && !(seasons.length >= 1 && hasSpecialSeason0)) return [];

  const cn = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  const labelOf = (s) => {
    const n = Number(s);
    if (!Number.isFinite(n) || n <= 0) return '未分季';
    if (n <= 10) return `第${cn[n]}季`;
    return `第${n}季`;
  };

  const tabs = seasons.map((s) => ({ key: `S${s}`, season: s, label: labelOf(s) }));
  if (hasZeroSeason) tabs.push({ key: 'S0', season: 0, label: hasSpecialSeason0 ? '特别篇' : '未分季' });
  return tabs;
});

const selectedSeason = ref(0);
watch(
  () => seasonTabs.value.map((t) => t.key).join(','),
  () => {
    const tabs = seasonTabs.value;
    if (!tabs.length) {
      selectedSeason.value = 0;
      return;
    }
    const exists = tabs.some((t) => Number(t.season) === Number(selectedSeason.value));
    if (!exists) selectedSeason.value = Number(tabs[0].season) || 0;
  },
  { immediate: true }
);

const selectSeason = (season) => {
  const n = Number(season);
  if (!Number.isFinite(n)) return;
  selectedSeason.value = n;
  selectedEpisodeGroup.value = '';
};

const displayedEpisodes = computed(() => {
  const list = allDisplayedEpisodes.value;
  const tabs = seasonTabs.value;
  if (!tabs.length) return list;
  return list.filter((it) => Number(it.season) === Number(selectedSeason.value));
});

const EPISODE_GROUP_SIZE = 50;
const UNRECOGNIZED_EPISODE_GROUP_KEY = 'g_unrecognized';

const episodeGroups = computed(() => {
  const hasMagic = hasMagicEpisodeRules.value;
  const list = displayedEpisodes.value;
  if (!list.length) return [];

  const makeLabel = (startNo, endNo) => {
    return episodeDescending.value ? `${endNo}-${startNo}` : `${startNo}-${endNo}`;
  };

  if (hasMagic) {
    const recognized = list.filter((it) => it && !it.unmatched && Number.isFinite(Number(it.no)) && Number(it.no) > 0);
    const unrecognized = list.filter((it) => it && it.unmatched);
    const maxNo = recognized.reduce((m, it) => (it && Number.isFinite(Number(it.no)) ? Math.max(m, Number(it.no)) : m), 0);
    if (!maxNo && !unrecognized.length) return [];
    const byIdx = new Map();
    recognized.forEach((it) => {
      const no = it && Number.isFinite(it.no) ? Number(it.no) : 0;
      if (!no) return;
      const idx = Math.floor((no - 1) / EPISODE_GROUP_SIZE);
      byIdx.set(idx, true);
    });
    const indices = Array.from(byIdx.keys()).sort((a, b) => a - b);
    const groups = indices.map((i) => {
      const startNo = i * EPISODE_GROUP_SIZE + 1;
      const endNo = Math.min(maxNo, (i + 1) * EPISODE_GROUP_SIZE);
      const key = `g${startNo}-${endNo}`;
      return { key, startNo, endNo, label: makeLabel(startNo, endNo) };
    });
    if (episodeDescending.value) groups.reverse();
    if (unrecognized.length) {
      groups.push({ key: UNRECOGNIZED_EPISODE_GROUP_KEY, startNo: 0, endNo: 0, label: '未识别分类', unrecognized: true });
    }
    return groups;
  }

  const total = selectedEpisodes.value.length;
  if (!total) return [];
  const groups = [];
  const count = Math.ceil(total / EPISODE_GROUP_SIZE);
  for (let i = 0; i < count; i += 1) {
    const startNo = i * EPISODE_GROUP_SIZE + 1;
    const endNo = Math.min(total, (i + 1) * EPISODE_GROUP_SIZE);
    const key = `g${startNo}-${endNo}`;
    groups.push({ key, startNo, endNo, label: makeLabel(startNo, endNo) });
  }
  if (episodeDescending.value) groups.reverse();
  return groups;
});

const selectedEpisodeGroup = ref('');
const selectedEpisodeGroupKey = computed(() => selectedEpisodeGroup.value || episodeGroups.value[0]?.key || '');

watch(
  () => String(selectedSeason.value),
  () => {
    if (!seasonTabs.value.length) return;
    selectedEpisodeGroup.value = '';
    scheduleUpdateHiddenEpisodeGroups();
  }
);

watch(
  () => episodeGroups.value.map((g) => g.key).join(','),
  () => {
    const groups = episodeGroups.value;
    if (!groups.length) {
      selectedEpisodeGroup.value = '';
      return;
    }
    const k = selectedEpisodeGroup.value;
    if (!k) return;
    const exists = groups.some((g) => g && g.key === k);
    if (!exists) selectedEpisodeGroup.value = '';
  },
  { immediate: true }
);

const groupedDisplayedEpisodes = computed(() => {
  const list = displayedEpisodes.value;
  const groups = episodeGroups.value;
  if (!list.length || !groups.length) return list;
  const g = groups.find((x) => x.key === selectedEpisodeGroupKey.value) || groups[0];
  if (!g) return list;
  if (g.key === UNRECOGNIZED_EPISODE_GROUP_KEY || g.unrecognized) {
    const unrecognized = list.filter((ep) => ep && ep.unmatched);
    return unrecognized.map((ep, idx) => {
      const displayNo = idx + 1;
      if (ep && ep.displayNo === displayNo) return ep;
      return { ...ep, displayNo };
    });
  }
  return list.filter((ep) => ep && ep.no >= g.startNo && ep.no <= g.endNo);
});

const episodeGroupTabsEl = ref(null);
const episodeGroupMoreEl = ref(null);
const episodeGroupMoreOpen = ref(false);
const episodeGroupHoverArmed = ref(false);
const hiddenEpisodeGroups = ref([]);

const updateHiddenEpisodeGroups = () => {
  try {
    const el = episodeGroupTabsEl.value;
    const groups = episodeGroups.value;
    if (!el || !groups.length) {
      hiddenEpisodeGroups.value = [];
      return;
    }
    const left = el.scrollLeft;
    const right = left + el.clientWidth;
    const nodes = Array.from(el.querySelectorAll('.episode-group-btn'));
    const hidden = [];
    nodes.forEach((btn, idx) => {
      const g = groups[idx];
      if (!g) return;
      const bLeft = btn.offsetLeft;
      const bRight = bLeft + btn.offsetWidth;
      const fullyVisible = bLeft >= left && bRight <= right;
      if (!fullyVisible) hidden.push(g);
    });
    hiddenEpisodeGroups.value = hidden;
  } catch (_e) {
    hiddenEpisodeGroups.value = [];
  }
};

let hiddenEpisodeGroupsRaf = 0;
const scheduleUpdateHiddenEpisodeGroups = () => {
  try {
    if (hiddenEpisodeGroupsRaf) cancelAnimationFrame(hiddenEpisodeGroupsRaf);
    hiddenEpisodeGroupsRaf = window.requestAnimationFrame(() => {
      hiddenEpisodeGroupsRaf = 0;
      updateHiddenEpisodeGroups();
    });
  } catch (_e) {}
};

const selectEpisodeGroup = (key) => {
  selectedEpisodeGroup.value = key;
  try {
    const el = episodeGroupTabsEl.value;
    if (!el) return;
    const idx = episodeGroups.value.findIndex((g) => g.key === key);
    if (idx < 0) return;
    const btn = el.querySelectorAll('.episode-group-btn')[idx];
    if (btn && typeof btn.scrollIntoView === 'function') {
      btn.scrollIntoView({ block: 'nearest', inline: 'center' });
    }
    scheduleUpdateHiddenEpisodeGroups();
  } catch (_e) {}
};

const normalizePlayPayload = (data) => {
  if (!data) return null;
  if (typeof data === 'string') {
    const t = data.trim();
    if (!t) return null;
    try {
      return JSON.parse(t);
    } catch (_e) {
      return null;
    }
  }
  if (typeof data === 'object') return data;
  return null;
};

const pickFirstPlayableUrl = (payload) => {
  const direct = payload && typeof payload.url === 'string' ? payload.url.trim() : '';
  if (direct) return direct;

  const arr = payload && Array.isArray(payload.url) ? payload.url : [];
  if (arr.length >= 2) {
    const s0 = typeof arr[0] === 'string' ? arr[0].trim() : '';
    const s1 = typeof arr[1] === 'string' ? arr[1].trim() : '';
    if (!/^https?:\/\//i.test(s0) && /^https?:\/\//i.test(s1)) return s1;
  }
  for (const v of arr) {
    const s = typeof v === 'string' ? v.trim() : '';
    if (s && /^https?:\/\//i.test(s)) return s;
  }
  return '';
};

const rewriteProxyUrlToBase = (urlString, apiBase, tvUser) => {
  const raw = typeof urlString === 'string' ? urlString.trim() : '';
  if (!raw) return '';
  const normalized = normalizeCatPawOpenApiBase(apiBase);
  if (!normalized) return raw;
  try {
    const u = new URL(raw);
    const host = (u.hostname || '').toLowerCase();
    const loopback = ['127.0.0.1', '0.0.0.0', 'localhost'];
    const base = new URL(normalized);
    const baseHost = (base.hostname || '').toLowerCase();
    const isLoopback = loopback.includes(host);
    const isSameHost = host && baseHost && host === baseHost;
    const needsDeport = u.port === '3006' && base.port !== '3006';
    if (!isLoopback && !(isSameHost && needsDeport)) return raw;

    // Drop origin/port from CatPawOpen raw URL, then resolve against configured base
    // (this keeps any base-path prefix and avoids leaking :3006 when not configured).
    const next = new URL(String(u.pathname || '/').replace(/^\//, ''), normalized);
    next.search = u.search || '';
    next.hash = u.hash || '';

    const safeUser = typeof tvUser === 'string' ? tvUser.trim() : '';
    if (safeUser && !next.searchParams.has('__tvuser')) next.searchParams.set('__tvuser', safeUser);
    return next.toString();
  } catch (_e) {
    return raw;
  }
};

const rewritePlayPayloadUrls = (payload, apiBase, tvUser) => {
  if (!payload || typeof payload !== 'object') return payload;
  if (typeof payload.url === 'string') {
    const u = payload.url;
    const rewritten = rewriteProxyUrlToBase(u, apiBase, tvUser);
    if (rewritten && rewritten !== u) return { ...payload, url: rewritten };
    return payload;
  }
  if (!Array.isArray(payload.url)) return payload;

  const next = { ...payload, url: payload.url.slice() };
  for (let i = 0; i < next.url.length; i += 1) {
    const u = next.url[i];
    if (typeof u !== 'string') continue;
    if (u.includes(':3006') || u.includes('127.0.0.1') || u.includes('0.0.0.0') || u.toLowerCase().includes('localhost')) {
      next.url[i] = rewriteProxyUrlToBase(u, apiBase, tvUser) || u;
    }
  }
  return next;
};

const normalizeHttpBase = (value) => {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return '';
  try {
    const u = new URL(raw);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return '';
    u.search = '';
    u.hash = '';
    return u.toString().replace(/\/+$/g, '');
  } catch (_e) {
    return '';
  }
};

const normalizeGoProxyServers = (value) => {
  const list = Array.isArray(value) ? value : [];
  const out = [];
  const seen = new Set();
  for (const it of list) {
    let base = '';
    if (typeof it === 'string') {
      base = normalizeHttpBase(it);
    } else if (it && typeof it === 'object') {
      const rawBase =
        (typeof it.base === 'string' && it.base) ||
        (typeof it.apiBase === 'string' && it.apiBase) ||
        (typeof it.api === 'string' && it.api) ||
        (typeof it.url === 'string' && it.url) ||
        '';
      base = normalizeHttpBase(rawBase);
    }
    if (!base || seen.has(base)) continue;
    const pans = it && typeof it === 'object' && typeof it.pans === 'object' && it.pans ? it.pans : {};
    const hasBaidu = Object.prototype.hasOwnProperty.call(pans, 'baidu');
    const hasQuark = Object.prototype.hasOwnProperty.call(pans, 'quark');
    out.push({
      base,
      label: (() => {
        if (it && typeof it === 'object') {
          const d = it.displayName != null ? String(it.displayName).trim() : '';
          if (d) return d;
          const n = it.name != null ? String(it.name).trim() : '';
          if (n) return n;
        }
        try {
          const u = new URL(base);
          return u.host || base;
        } catch (_e) {
          return base;
        }
      })(),
      pans: {
        baidu: hasBaidu ? !!pans.baidu : true,
        quark: hasQuark ? !!pans.quark : true,
      },
    });
    seen.add(base);
  }
  return out;
};

const GO_PROXY_SELECTED_BASE_STORAGE_KEY = 'meowfilm:goproxy:selectedBase';

const goProxyManualBase = ref('');
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    goProxyManualBase.value = normalizeHttpBase(window.localStorage.getItem(GO_PROXY_SELECTED_BASE_STORAGE_KEY) || '');
  }
} catch (_e) {
  goProxyManualBase.value = '';
}

const goProxyInUseBase = ref('');
const lastGoProxyCandidate = ref(null);

const guessPreferredPanFromFlag = (flag) => {
  const raw = typeof flag === 'string' ? flag.trim() : '';
  if (!raw) return '';
  if (raw.includes('百度')) return 'baidu';
  const lower = raw.toLowerCase();
  if (raw.includes('夸父') || raw.includes('夸克') || lower.includes('quark') || lower.includes('kuafu')) return 'quark';
  return '';
};

const joinBaseUrl = (base, relativePath) => {
  const b = normalizeHttpBase(base);
  const rel = typeof relativePath === 'string' ? relativePath.trim() : '';
  if (!b || !rel) return '';
  const baseWithSlash = b.endsWith('/') ? b : `${b}/`;
  try {
    return new URL(rel.startsWith('./') ? rel : `./${rel.replace(/^\//, '')}`, baseWithSlash).toString();
  } catch (_e) {
    return '';
  }
};

const normalizeHttpBaseWithSlash = (value) => {
  const b = normalizeHttpBase(value);
  return b ? `${b}/` : '';
};

const isWodePanVideoId = (videoId) => {
  const id = String(videoId || '').trim();
  if (!id) return false;
  return /######wodepan$/i.test(id);
};

const goProxyPickState = {
  selectedBase: '',
  selectedPan: '',
  inFlight: null,
  inFlightPan: '',
};

const speedTestGoProxyBase = async (base, bytes = 2 * 1024 * 1024, timeoutMs = 8000) => {
  const url = joinBaseUrl(base, `speed?bytes=${encodeURIComponent(String(bytes))}&_=${Date.now()}`);
  if (!url) throw new Error('invalid speed url');
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const t = setTimeout(() => {
    try {
      if (controller) controller.abort();
    } catch (_e) {}
  }, timeoutMs);
  const started = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  try {
    const resp = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-store',
      signal: controller ? controller.signal : undefined,
    });
    if (!resp.ok) throw new Error(`speed http ${resp.status}`);
    const body = resp.body;
    let total = 0;
    if (body && typeof body.getReader === 'function') {
      const reader = body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value && value.byteLength) total += value.byteLength;
      }
    } else {
      const buf = await resp.arrayBuffer();
      total = buf ? buf.byteLength : 0;
    }
    const ended = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    const seconds = Math.max(0.001, (ended - started) / 1000);
    return total / seconds; // bytes/sec
  } finally {
    clearTimeout(t);
  }
};

const pickGoProxyBaseForPlayback = async (pan = '') => {
  const servers = normalizeGoProxyServers(props.bootstrap?.settings?.goProxyServers);
  if (!servers.length) return '';
  const p = typeof pan === 'string' ? pan.trim().toLowerCase() : '';
  const eligible = (p === 'baidu' || p === 'quark')
    ? servers.filter((s) => !!(s && s.pans && s.pans[p]))
    : servers;
  if (!eligible.length) return '';

  const manual = normalizeHttpBase(goProxyManualBase.value);
  if (manual && eligible.some((s) => s && s.base === manual)) {
    goProxyPickState.selectedBase = manual;
    goProxyPickState.selectedPan = p;
    goProxyPickState.inFlight = null;
    goProxyPickState.inFlightPan = '';
    return manual;
  }

  const autoSelect = !!props.bootstrap?.settings?.goProxyAutoSelect;
  if (!autoSelect) return eligible[0].base;

  if (goProxyPickState.selectedBase && goProxyPickState.selectedPan === p) return goProxyPickState.selectedBase;
  if (goProxyPickState.inFlight && goProxyPickState.inFlightPan === p) return await goProxyPickState.inFlight;

  goProxyPickState.inFlight = (async () => {
    const tests = eligible.map(async (s) => {
      const base = s && s.base ? s.base : '';
      if (!base) return { base: '', bps: 0, ok: false };
      try {
        const bps = await speedTestGoProxyBase(base);
        return { base, bps, ok: true };
      } catch (_e) {
        return { base, bps: 0, ok: false };
      }
    });
    const results = await Promise.all(tests);
    const best = results
      .filter((r) => r && r.ok && r.base)
      .sort((a, b) => (b.bps || 0) - (a.bps || 0))[0];
    const chosen = best && best.base ? best.base : eligible[0].base;
    goProxyPickState.selectedBase = chosen || '';
    goProxyPickState.selectedPan = p;
    return goProxyPickState.selectedBase;
  })();
  goProxyPickState.inFlightPan = p;
  try {
    return await goProxyPickState.inFlight;
  } finally {
    if (goProxyPickState.inFlightPan === p) {
      goProxyPickState.inFlight = null;
      goProxyPickState.inFlightPan = '';
    }
  }
};

const registerGoProxyToken = async ({ base, url, headers }) => {
  const b = normalizeHttpBase(base);
  if (!b) throw new Error('missing goProxy base');
  const targetUrl = typeof url === 'string' ? url.trim() : '';
  if (!targetUrl) throw new Error('missing play url');
  const h = headers && typeof headers === 'object' ? headers : {};
  const headersList = [];
  Object.keys(h).forEach((k) => {
    const key = typeof k === 'string' ? k.trim() : '';
    if (!key) return;
    const v = h[k];
    if (v == null) return;
    if (Array.isArray(v)) {
      v.forEach((it) => {
        if (it == null) return;
        const s = String(it).trim();
        if (!s) return;
        headersList.push({ key, value: s });
      });
      return;
    }
    const s = String(v).trim();
    if (!s) return;
    headersList.push({ key, value: s });
  });
  const registerUrl = joinBaseUrl(b, 'register');
  if (!registerUrl) throw new Error('invalid register url');
  const resp = await fetch(registerUrl, {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: targetUrl, headersList }),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    const msg = (data && (data.message || data.error)) ? String(data.message || data.error) : 'request failed';
    const err = new Error(msg);
    err.status = resp.status;
    throw err;
  }
  const token = data && data.token ? String(data.token).trim() : '';
  if (!token) throw new Error('missing token');
  const proxyUrl = joinBaseUrl(b, encodeURIComponent(token));
  if (!proxyUrl) throw new Error('invalid proxy url');
  return { token, proxyUrl };
};

const isProbablyM3U8Url = (urlString) => {
  const raw = typeof urlString === 'string' ? urlString.trim() : '';
  if (!raw) return false;
  try {
    const u = new URL(raw, window.location.href);
    const hinted = String(u.searchParams.get('__tv_fmt') || '').trim().toLowerCase();
    if (hinted === 'm3u8' || hinted === 'hls') return true;
    return String(u.pathname || '').toLowerCase().endsWith('.m3u8');
  } catch (_e) {
    const noQuery = raw.split('#')[0].split('?')[0].toLowerCase();
    return noQuery.endsWith('.m3u8');
  }
};

const parseM3U8FirstUrls = (text) => {
  const raw = typeof text === 'string' ? text : '';
  const lines = raw.split(/\r?\n/);
  let firstUri = '';
  let keyUri = '';
  for (const line of lines) {
    const t = String(line || '').trim();
    if (!t) continue;
    if (t.startsWith('#')) {
      if (!keyUri && /^#EXT-X-KEY\b/i.test(t) && /URI\s*=\s*"/i.test(t)) {
        const m = /URI\s*=\s*"([^"]+)"/i.exec(t);
        if (m && m[1]) keyUri = String(m[1]).trim();
      }
      continue;
    }
    if (!firstUri) firstUri = t;
    if (firstUri && keyUri) break;
  }
  return { firstUri, keyUri };
};

const probeFetchSmall = async (urlString, timeoutMs = 6000) => {
  const url = typeof urlString === 'string' ? urlString.trim() : '';
  if (!url) return { ok: false, status: 0, message: 'missing url' };
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const t = setTimeout(() => {
    try {
      if (controller) controller.abort();
    } catch (_e) {}
  }, timeoutMs);
  try {
    const resp = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-store',
      headers: { Range: 'bytes=0-0' },
      signal: controller ? controller.signal : undefined,
    });
    const status = resp && typeof resp.status === 'number' ? resp.status : 0;
    if (!resp || !resp.ok) return { ok: false, status, message: `http ${status}` };
    if (status !== 200 && status !== 206) return { ok: false, status, message: `unexpected http ${status}` };
    return { ok: true, status, message: '' };
  } catch (e) {
    const msg = e && e.name === 'AbortError' ? 'timeout' : (e && e.message ? String(e.message) : 'fetch failed');
    return { ok: false, status: 0, message: msg };
  } finally {
    clearTimeout(t);
  }
};

const registerCatM3U8 = async ({ apiBase, tvUser, url, headers }) => {
  const base = normalizeCatPawOpenApiBase(apiBase);
  if (!base) throw new Error('CatPawOpen 接口地址未设置');
  const target = new URL('api/m3u8/register', base);
  const u = typeof tvUser === 'string' ? tvUser.trim() : '';
  const resp = await fetch(target.toString(), {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    headers: { 'Content-Type': 'application/json', ...(u ? { 'X-TV-User': u } : {}) },
    body: JSON.stringify({
      url: typeof url === 'string' ? url.trim() : '',
      headers: headers && typeof headers === 'object' ? headers : {},
    }),
  });
  const status = resp && typeof resp.status === 'number' ? resp.status : 0;
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || !data || data.ok === false) {
    const msg = data && (data.message || data.error) ? String(data.message || data.error) : `HTTP ${status}`;
    const err = new Error(msg);
    err.status = status;
    throw err;
  }
  const token = data && data.token ? String(data.token).trim() : '';
  const indexPath = data && data.index ? String(data.index).trim() : '';
  const proxyPath = data && data.proxy ? String(data.proxy).trim() : '';
  if (!token || !indexPath || !proxyPath) throw new Error('CatPawOpen m3u8 register 返回无效');
  const indexUrl = new URL(indexPath.replace(/^\//, ''), base).toString();
  const proxyUrl = new URL(proxyPath.replace(/^\//, ''), base).toString();
  return { token, indexUrl, proxyUrl };
};

const fetchM3U8Text = async ({ url, tvUser }) => {
  const target = typeof url === 'string' ? url.trim() : '';
  if (!target) throw new Error('missing m3u8 url');
  const u = typeof tvUser === 'string' ? tvUser.trim() : '';
  const resp = await fetch(target, {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
    cache: 'no-store',
    headers: { ...(u ? { 'X-TV-User': u } : {}) },
  });
  if (!resp.ok) {
    const err = new Error(`m3u8 http ${resp.status}`);
    err.status = resp.status;
    throw err;
  }
  return await resp.text();
};

const hasNonEmptyHeaders = (headers) => {
  const h = headers && typeof headers === 'object' ? headers : {};
  return Object.keys(h).some((k) => {
    if (!k || typeof k !== 'string') return false;
    const v = h[k];
    if (v == null) return false;
    if (Array.isArray(v)) return v.some((it) => it != null && String(it).trim());
    return String(v).trim();
  });
};

const maybeUseCatM3U8ProxyForPlayback = async ({
  apiBase,
  tvUser,
  playUrl,
  playHeaders,
}) => {
  if (!isProbablyM3U8Url(playUrl)) return null;
  if (!apiBase) return null;

  const hasHeader = hasNonEmptyHeaders(playHeaders);

  // If server doesn't require headers, prefer direct m3u8 fetch first. If it fails (CORS/IP/anti-leech),
  // then fall back to CatPawOpen m3u8 registration + proxy rewrite.
  if (!hasHeader) {
    try {
      await fetchM3U8Text({ url: playUrl, tvUser });
      return { url: playUrl, headers: playHeaders, reason: 'direct-m3u8-fetch-ok' };
    } catch (_e) {
      // continue to register flow
    }
  }

  // 1) Ask CatPawOpen to fetch the m3u8 with required headers and give us both playlists.
  const { indexUrl, proxyUrl } = await registerCatM3U8({ apiBase, tvUser, url: playUrl, headers: playHeaders });

  // 2) Fetch the normalized "index" playlist (absolute URIs), then probe first segment (and key if present)
  // from the client side to decide whether direct segment fetching works (CORS / IP-binding / anti-leech).
  let text = '';
  try {
    text = await fetchM3U8Text({ url: indexUrl, tvUser });
  } catch (_e) {
    // If we can't even fetch index, fall back to proxy playlist.
    return { url: proxyUrl, headers: {}, reason: 'index-fetch-failed' };
  }
  const { firstUri, keyUri } = parseM3U8FirstUrls(text);
  if (!firstUri) return { url: proxyUrl, headers: {}, reason: 'no-segment' };

  // If this is a master playlist (child m3u8), prefer proxy mode to avoid cross-site m3u8 fetches.
  if (String(firstUri).toLowerCase().endsWith('.m3u8')) return { url: proxyUrl, headers: {}, reason: 'master-playlist' };

  if (keyUri) {
    const keyProbe = await probeFetchSmall(keyUri);
    if (!keyProbe.ok) return { url: proxyUrl, headers: {}, reason: `key-probe-failed:${keyProbe.message}` };
  }
  const segProbe = await probeFetchSmall(firstUri);
  if (!segProbe.ok) return { url: proxyUrl, headers: {}, reason: `seg-probe-failed:${segProbe.message}` };

  // Direct mode: use CatPawOpen index playlist (same-origin), but segments stay upstream.
  return { url: indexUrl, headers: {}, reason: 'direct-ok' };
};

const maybeUseGoProxyForPlayback = async (playUrl, playHeaders, preferredPan = '', enabled = false) => {
  if (!enabled) return { url: playUrl, headers: playHeaders, goProxyBase: '' };
  const hasHeader = hasNonEmptyHeaders(playHeaders);
  // Only proxy when server explicitly returns playback headers (typical anti-leech/CORS cases).
  if (!hasHeader) return { url: playUrl, headers: playHeaders, goProxyBase: '' };

  const base = await pickGoProxyBaseForPlayback(preferredPan);
  if (!base) return { url: playUrl, headers: playHeaders, goProxyBase: '' };
  const { proxyUrl } = await registerGoProxyToken({ base, url: playUrl, headers: playHeaders });

  // Preserve format for token URLs that don't carry a suffix.
  const decorated = (() => {
    try {
      const origin = new URL(String(playUrl || '').trim(), window.location.href);
      const isM3U8 = String(origin.pathname || '').toLowerCase().endsWith('.m3u8');
      if (!isM3U8) return proxyUrl;
      const p = new URL(String(proxyUrl || '').trim(), window.location.href);
      p.searchParams.set('__tv_fmt', 'm3u8');
      return p.toString();
    } catch (_e) {
      const u = String(proxyUrl || '').trim();
      if (!u) return proxyUrl;
      const sep = u.includes('?') ? '&' : '?';
      return `${u}${sep}__tv_fmt=m3u8`;
    }
  })();

  return { url: decorated, headers: {}, goProxyBase: base };
};

const goProxyUiEligible = computed(() => {
  const enabled = !!props.bootstrap?.settings?.goProxyEnabled;
  if (!enabled) return false;
  const candidate = lastGoProxyCandidate.value;
  if (!candidate || !candidate.enabled) return false;
  return hasNonEmptyHeaders(candidate.headers);
});

const goProxyUiOptions = computed(() => {
  const enabled = !!props.bootstrap?.settings?.goProxyEnabled;
  if (!enabled || !goProxyUiEligible.value) return [];
  const servers = normalizeGoProxyServers(props.bootstrap?.settings?.goProxyServers);
  return servers.map((s) => ({ base: s.base, label: s.label }));
});

const goProxyUiLabel = computed(() => {
  const enabled = !!props.bootstrap?.settings?.goProxyEnabled;
  if (!enabled || !goProxyUiEligible.value) return '';
  const servers = normalizeGoProxyServers(props.bootstrap?.settings?.goProxyServers);
  if (!servers.length) return '';

  const inUse = normalizeHttpBase(goProxyInUseBase.value);
  const manual = normalizeHttpBase(goProxyManualBase.value);
  const active = inUse || manual;
  if (active) {
    const found = servers.find((s) => s && s.base === active);
    if (found && found.label) return found.label;
  }

  return servers[0].label || 'GoProxy';
});

const onGoProxySelect = async (base) => {
  if (!goProxyUiEligible.value) return;
  const nextBase = normalizeHttpBase(base);
  goProxyManualBase.value = nextBase;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (nextBase) window.localStorage.setItem(GO_PROXY_SELECTED_BASE_STORAGE_KEY, nextBase);
      else window.localStorage.removeItem(GO_PROXY_SELECTED_BASE_STORAGE_KEY);
    }
  } catch (_e) {}

  goProxyPickState.selectedBase = '';
  goProxyPickState.selectedPan = '';
  goProxyPickState.inFlight = null;
  goProxyPickState.inFlightPan = '';

  const candidate = lastGoProxyCandidate.value;
  if (!candidate || !candidate.url) return;
  if (!candidate.enabled) return;
  try {
    goProxyInUseBase.value = '';
    const preferredPan = typeof candidate.preferredPan === 'string' ? candidate.preferredPan : '';
    const out = await maybeUseGoProxyForPlayback(candidate.url, candidate.headers || {}, preferredPan, true);
    if (out && typeof out === 'object') {
      const u = typeof out.url === 'string' ? out.url.trim() : '';
      if (u) {
        playerMetaReady.value = false;
        playerBuffering.value = false;
        playerPlaybackStarted.value = false;
        playerFirstFrameReady.value = false;
        if (playerFirstFrameTimer) {
          window.clearTimeout(playerFirstFrameTimer);
          playerFirstFrameTimer = 0;
        }
        goProxyInUseBase.value = out.goProxyBase ? String(out.goProxyBase) : '';
        playerUrl.value = u;
        playerHeaders.value = out.headers && typeof out.headers === 'object' ? out.headers : {};
        await nextTick();
        try {
          if (artPlayerRef.value && typeof artPlayerRef.value.tryAutoplay === 'function') await artPlayerRef.value.tryAutoplay();
        } catch (_e) {}
      }
    }
  } catch (e) {
    console.warn('[GoProxy] switch failed:', e && e.message ? e.message : e);
  }
};

const playRequestState = {
  seq: 0,
  inFlightKey: '',
  inFlight: null,
};

const requestPlay = async () => {
  const api = resolvedSpiderApiFinal.value;
  const src = selectedPanSource.value;
  const eps = selectedEpisodes.value;
  const idx = selectedEpisodeIndex.value;
  const ep = eps[idx];
  const flag =
    ep && ep.flag
      ? String(ep.flag)
      : src && src.label
        ? String(src.label)
        : '';
  const id = ep && ep.url ? String(ep.url) : '';
  if (!api || !flag || !id) return false;
  const playKey = `${api}::${selectedPanKey.value}::${idx}::${flag}::${id}`;
  if (playRequestState.inFlight && playRequestState.inFlightKey === playKey) {
    await playRequestState.inFlight;
    return true;
  }
  const panKeyAtCall = selectedPanKey.value;
  const idxAtCall = idx;
  const epNameAtCall = ep && ep.name ? String(ep.name) : '';

  playRequestState.seq += 1;
  const seqAtCall = playRequestState.seq;
  playRequestState.inFlightKey = playKey;

  const run = (async () => {
    playLoading.value = true;
    playError.value = '';
    playerRuntimeError.value = '';
    playerUrl.value = '';
    playerHeaders.value = {};
    playerMetaReady.value = false;
    playerBuffering.value = false;
    playerPlaybackStarted.value = false;
    playerFirstFrameReady.value = false;
    goProxyInUseBase.value = '';
    lastGoProxyCandidate.value = null;
    if (playerFirstFrameTimer) {
      window.clearTimeout(playerFirstFrameTimer);
      playerFirstFrameTimer = 0;
    }
    try {
		    const role = props.bootstrap && props.bootstrap.user && props.bootstrap.user.role ? String(props.bootstrap.user.role) : '';
		    const userBase = props.bootstrap?.settings?.userCatPawOpenApiBase || '';
		    const serverBase = props.bootstrap?.settings?.catPawOpenApiBase || '';
		    const apiBase = (role === 'user' ? userBase : (userBase || serverBase)).trim();
		    const tvUser = props.bootstrap?.user?.username || '';

	        const fetchPlay = async () => {
	          const siteApi = String(api || '').trim();
	          const siteId = (() => {
	            const m = /^\/([a-f0-9]{10})\/spider\//.exec(siteApi);
	            return m && m[1] ? String(m[1]) : '';
	          })();
	          const raw = await requestCatPlay({
	            apiBase,
	            username: tvUser,
	            payload: { flag, id, siteApi, ...(siteId ? { siteId } : {}) },
	          });
	          const rewritten = rewritePlayPayloadUrls(raw, apiBase, tvUser);
	          const payload = normalizePlayPayload(rewritten);
	          const url = pickFirstPlayableUrl(payload);
	          const rawHeaders = payload && payload.header && typeof payload.header === 'object' ? payload.header : {};
	          return { raw, payload, url, rawHeaders };
	        };

        let playResult = null;
        let finalUrl = '';
        let finalHeaders = {};
        let disableGoProxy = false;

        if (!finalUrl) {
          playResult = await fetchPlay();
          if (!playResult.url) {
            if (seqAtCall === playRequestState.seq) playError.value = '无可用播放地址';
            return;
          }
          finalUrl = playResult.url;
          finalHeaders = playResult.rawHeaders || {};
        }

        const goProxyEnabled = !!props.bootstrap?.settings?.goProxyEnabled;

	      // HLS/m3u8: if possible, use CatPawOpen m3u8 proxy mode to avoid CORS/IP-bound issues.
	      // - index.m3u8: CatPawOpen fetches playlist with headers and returns absolute URIs (segments are upstream)
	      // - proxy.m3u8: playlist + segments/key are proxied through CatPawOpen
	      try {
	        const out = await maybeUseCatM3U8ProxyForPlayback({
	          apiBase,
	          tvUser,
	          playUrl: finalUrl,
	          playHeaders: finalHeaders,
	        });
	        if (out && typeof out.url === 'string' && out.url.trim()) {
	          finalUrl = out.url.trim();
	          finalHeaders = out.headers && typeof out.headers === 'object' ? out.headers : {};
	          disableGoProxy = true;
	        }
	      } catch (_e) {
	        // best-effort
	      }

	      try {
	        const preferredPan = guessPreferredPanFromFlag(flag);
          goProxyInUseBase.value = '';
          lastGoProxyCandidate.value = {
            url: finalUrl,
            headers: finalHeaders,
            preferredPan,
            enabled: goProxyEnabled && !disableGoProxy,
          };
	        const out = await maybeUseGoProxyForPlayback(finalUrl, finalHeaders, preferredPan, goProxyEnabled && !disableGoProxy);
	        if (out && typeof out === 'object') {
	          if (typeof out.url === 'string' && out.url.trim()) finalUrl = out.url.trim();
	          if (out.headers && typeof out.headers === 'object') finalHeaders = out.headers;
            goProxyInUseBase.value = out.goProxyBase ? String(out.goProxyBase) : '';
	        }
	      } catch (e) {
        // Keep direct URL as fallback (GoProxy is best-effort on the client).
        console.warn('[GoProxy] register failed:', e && e.message ? e.message : e);
      }
        if (seqAtCall !== playRequestState.seq) return;
		    playerMetaReady.value = false;
        playerBuffering.value = false;
        playerPlaybackStarted.value = false;
        playerFirstFrameReady.value = false;
        if (playerFirstFrameTimer) {
          window.clearTimeout(playerFirstFrameTimer);
          playerFirstFrameTimer = 0;
        }
		    playerUrl.value = finalUrl;
		    playerHeaders.value = finalHeaders;
		    playingPanKey.value = panKeyAtCall;
		    playingEpisodeIndex.value = idxAtCall;
        try {
          await nextTick();
          if (seqAtCall === playRequestState.seq && artPlayerRef.value && typeof artPlayerRef.value.tryAutoplay === 'function') {
            await artPlayerRef.value.tryAutoplay();
          }
        } catch (_e) {}

				    try {
				      const siteKey = (props.siteKey || '').trim();
				      const spiderApi = (api || '').trim();
				      const videoId = (props.videoId || '').trim();
			      const videoTitle = displayTitle.value || '';
			      const isNetDisk = isWodePanVideoId(videoId);
			      if (!isNetDisk && siteKey && spiderApi && videoId && videoTitle) {
			        const payloadForHistory = {
			          siteKey,
			          siteName: resolvedSiteName.value || '',
			          spiderApi,
			          videoId,
			          videoTitle,
			          contentKey: computeHistoryContentKey(videoTitle) || '',
			          videoPoster: historyCoverPoster.value || pickHistoryPoster() || '',
			          videoRemark: (props.videoRemark || '').trim(),
			          panLabel: (src && src.label ? String(src.label) : '').trim(),
			          playFlag: flag,
			          episodeIndex: idxAtCall >= 0 ? idxAtCall : 0,
			          episodeName: epNameAtCall,
			        };
			        lastHistoryPayload.value = payloadForHistory;
		        await apiPostJson('/api/playhistory', { ...payloadForHistory }, { dedupe: false });
			        window.dispatchEvent(new CustomEvent('tv:play-history-updated'));
			      }
			    } catch (_e) {
		      // ignore (history not critical)
		    }
	  } catch (e) {
	    const status = e && typeof e.status === 'number' ? e.status : 0;
	    const msg = (e && e.message) || '请求失败';
        if (seqAtCall === playRequestState.seq) playError.value = status ? `HTTP ${status}：${msg}` : msg;
	  } finally {
        if (seqAtCall === playRequestState.seq) playLoading.value = false;
	  }
  })();

  playRequestState.inFlight = run;
  try {
    await run;
  } finally {
    if (playRequestState.inFlight === run) playRequestState.inFlight = null;
  }
  return true;
};

const tryAutoStartPlayback = () => {
  if (initialAutoPlayTriggered.value) return;
  if (introLoading.value) return;
  if (!resumeHistoryLoaded.value) return;
  if (!selectedEpisodes.value.length) return;
  void ensureResolvedSpiderApiFallback();
  if (!resolvedSpiderApiFinal.value) return;
  if (selectedEpisodeIndex.value < 0) selectedEpisodeIndex.value = 0;
  void requestPlay().then((started) => {
    if (!started) return;
    initialAutoPlayTriggered.value = true;
  });
};

const onPlayerLoadedMetadata = () => {
  playerMetaReady.value = true;
};

const onPlayerBuffering = (v) => {
  playerBuffering.value = !!v;
};

const onPlayerPlaying = () => {
  playerPlaybackStarted.value = true;
  playerBuffering.value = false;
};

const onPlayerFirstFrame = () => {
  if (playerFirstFrameReady.value) return;
  if (playerFirstFrameTimer) return;
  // Delay unmasking slightly to avoid 1-frame compositor flashes on some browsers/devices.
  playerFirstFrameTimer = window.setTimeout(() => {
    playerFirstFrameTimer = 0;
    playerFirstFrameReady.value = true;
  }, 120);
};

const onPlayerError = (e) => {
  try {
    const msg = e && e.message ? String(e.message) : '';
    playerRuntimeError.value = msg || '播放失败';
  } catch (_e) {
    playerRuntimeError.value = '播放失败';
  }
};

const playerPhase = computed(() => {
  if (playError.value) return 'error';
  if (playerRuntimeError.value) return 'error';
  if (introLoading.value) return 'detail';
  if (introError.value && !playerUrl.value) return 'error';
  if (!playerUrl.value) {
    if (playLoading.value) return 'play_url';
    return 'idle';
  }
  if (!playerMetaReady.value) return 'play_info';
  if (playerBuffering.value) return 'buffering';
  if (!playerPlaybackStarted.value || !playerFirstFrameReady.value) return 'buffering';
  return 'ready';
});

const playerPhaseLoading = computed(() => {
  return (
    playerPhase.value === 'detail' ||
    playerPhase.value === 'play_url' ||
    playerPhase.value === 'play_info'
  );
});

const playerPhaseText = computed(() => {
  switch (playerPhase.value) {
    case 'detail':
      return '正在获取视频信息...';
    case 'play_url':
      return '正在获取播放地址...';
    case 'play_info':
      return '正在获取播放信息...';
    case 'buffering':
      return '';
    case 'error':
      return playerRuntimeError.value || playError.value || introError.value || '请求失败';
    case 'idle':
      return '待播放';
    default:
      return '加载中...';
  }
});

const playerStageItems = [
  { key: 'detail', label: '信息' },
  { key: 'play_url', label: '地址' },
  { key: 'play_info', label: '信息' },
];

// 0..3 (3 means all done)
const playerStageIndex = computed(() => {
  switch (playerPhase.value) {
    case 'detail':
      return 0;
    case 'play_url':
      return 1;
    case 'play_info':
      return 2;
    case 'buffering':
      return 3;
    case 'ready':
      return 3;
    case 'error': {
      if (playerUrl.value && playerPlaybackStarted.value) return 3;
      if (playerUrl.value && playerMetaReady.value) return 3;
      if (playerUrl.value && !playerMetaReady.value) return 2;
      if (!playerUrl.value && playLoading.value) return 1;
      if (introLoading.value) return 0;
      return 0;
    }
    case 'idle':
    default:
      return 0;
  }
});

const playerStageDoneCount = computed(() => Math.max(0, Math.min(playerStageIndex.value, playerStageItems.length)));
const playerStageActiveIndex = computed(() => Math.max(0, Math.min(playerStageIndex.value, playerStageItems.length - 1)));

const playerStageProgress = computed(() => {
  const total = playerStageItems.length || 3;
  if (playerPhase.value === 'idle') return 0;
  if (playerStageIndex.value >= total) return 1;
  if (playerPhase.value === 'error') return playerStageDoneCount.value / total;
  return (playerStageDoneCount.value + 0.5) / total;
});


const loadResumeFromHistory = async () => {
  resumeHistoryLoaded.value = false;
  resumeHistoryApplied.value = false;
  panPrefApplied.value = false;
  resumeHistory.value = null;
  const siteKey = (props.siteKey || '').trim();
  const videoId = (props.videoId || '').trim();
  if (!siteKey || !videoId) {
    resumeHistoryLoaded.value = true;
    return;
  }
  const key = `${siteKey}::${videoId}`;
  if (resumeHistoryState.inFlight && resumeHistoryState.key === key) {
    await resumeHistoryState.inFlight;
    return;
  }
  resumeHistoryState.seq += 1;
  const seqAtCall = resumeHistoryState.seq;
  resumeHistoryState.key = key;
  try {
    resumeHistoryState.inFlight = (async () => {
      try {
        try {
          const item = await apiGetJson(`/api/playhistory/one${buildQuery({ siteKey, videoId })}`, { cacheMs: 2000 });
          if (seqAtCall !== resumeHistoryState.seq) return;
          if (item && item.siteKey === siteKey && item.videoId === videoId) {
            resumeHistory.value = item;
            return;
          }
          if (item == null) {
            resumeHistory.value = null;
            return;
          }
        } catch (_e) {
          // fallback
        }
        const list = await apiGetJson(`/api/playhistory${buildQuery({ limit: 50 })}`, { cacheMs: 2000 });
        if (seqAtCall !== resumeHistoryState.seq) return;
        const items = Array.isArray(list) ? list : [];
        const found = items.find((r) => r && r.siteKey === siteKey && r.videoId === videoId) || null;
        resumeHistory.value = found;
      } catch (_e) {
        if (seqAtCall === resumeHistoryState.seq) resumeHistory.value = null;
      }
    })();
    await resumeHistoryState.inFlight;
  } catch (_e) {
    if (seqAtCall === resumeHistoryState.seq) resumeHistory.value = null;
  } finally {
    if (seqAtCall === resumeHistoryState.seq) resumeHistoryLoaded.value = true;
    if (resumeHistoryState.key === key && resumeHistoryState.seq === seqAtCall) resumeHistoryState.inFlight = null;
  }
  tryAutoStartPlayback();
};

watch(
  () => aggregatedSources.value.length,
  async (len) => {
    if (!len) return;
    if (aggregatedFromStorage.value) {
      // If we came from search, sessionStorage already has exact matches. Lock immediately.
      await tryLockHistoryPoster({ force: true, allowFallback: true });
      return;
    }
    // If we are doing a swap-source search, lock only when preferred is found,
    // or after the search completes (handled by the watcher below).
    await tryLockHistoryPoster({ force: false, allowFallback: false });
  }
);

watch(
  () => sourcesSearchedOnce.value,
  async (done) => {
    if (!done) return;
    if (historyCoverLocked.value) return;
    if (!aggregatedSources.value || !aggregatedSources.value.length) return;
    await tryLockHistoryPoster({ force: true, allowFallback: true });
  }
);

watch(
  () =>
    [
      introLoading.value,
      resumeHistoryLoaded.value ? '1' : '0',
      panPrefStorageKey.value,
      selectedPanKey.value,
      resolvedSpiderApiFinal.value,
      selectedEpisodes.value.length,
      selectedEpisodeIndex.value,
    ].join('|'),
  () => {
    if (initialAutoPlayTriggered.value) return;
    if (introLoading.value) return;
    if (!resumeHistoryLoaded.value) return;
    if (!selectedEpisodes.value.length) return;

    // Folder-like sources (e.g. 网盘目录) often return an episode list for the whole directory.
    // Ensure the clicked file (props.videoId) becomes the initially selected episode.
    if (!autoPickedEpisodeFromVideoId.value && !resumeHistory.value) {
      autoPickedEpisodeFromVideoId.value = true;
      const picked = pickEpisodeByUrlAcrossPans(props.videoId || '');
      if (picked && picked.panKey) {
        selectedPan.value = picked.panKey;
        selectedEpisodeIndex.value = picked.index;
        return;
      }
    }

    // Apply remembered pan preference (same video dimension) when there's no play history for this site/videoId.
    if (!panPrefApplied.value && !resumeHistory.value) {
      const prevPan = selectedPan.value;
      const canReadPref = !!panPrefStorageKey.value;
      const pref = canReadPref ? readPanPref() : '';
      if (pref === SMART_PAN_KEY && smartListAvailable.value) {
        selectedPan.value = SMART_PAN_KEY;
        panDropdownOpen.value = false;
        selectedEpisodeGroup.value = '';
        selectedEpisodeIndex.value = -1;
        panPrefApplied.value = true;
        if (prevPan !== selectedPan.value) return;
      } else if (pref) {
        const foundKey = findPanKeyByPrefLabel(pref);
        if (foundKey) {
          selectedPan.value = foundKey;
          panDropdownOpen.value = false;
          selectedEpisodeGroup.value = '';
          selectedEpisodeIndex.value = -1;
          panPrefApplied.value = true;
          if (prevPan !== selectedPan.value) return;
        }
      } else if (smartListAvailable.value) {
        selectedPan.value = SMART_PAN_KEY;
        panDropdownOpen.value = false;
        selectedEpisodeGroup.value = '';
        selectedEpisodeIndex.value = -1;
        panPrefApplied.value = true;
        if (prevPan !== selectedPan.value) return;
      } else if (canReadPref) {
        // No preference, no smart pan: mark applied once we have a stable content key.
        panPrefApplied.value = true;
      }
    }

	    // Restore from history once (pan + episode), if available and already loaded.
	    if (!resumeHistoryApplied.value && resumeHistoryLoaded.value && resumeHistory.value) {
	      const prevPan = selectedPan.value;
	      const prevIdx = selectedEpisodeIndex.value;
	      const wantedPanLabel = typeof resumeHistory.value.panLabel === 'string' ? resumeHistory.value.panLabel.trim() : '';
	      const wantedIdxRaw = resumeHistory.value.episodeIndex != null ? Number(resumeHistory.value.episodeIndex) : 0;
	      const wantedIdx = Number.isFinite(wantedIdxRaw) && wantedIdxRaw >= 0 ? Math.floor(wantedIdxRaw) : 0;
	      const wantedEpName = typeof resumeHistory.value.episodeName === 'string' ? resumeHistory.value.episodeName.trim() : '';
	      const normalize = (label) => String(label || '').trim().replace(/#\d{1,3}\s*$/i, '').trim().toLowerCase();

	      let target = null;
	      if (wantedPanLabel) {
	        const want = normalize(wantedPanLabel);
          if (want === normalize(SMART_PAN_LABEL) && smartListAvailable.value) {
            selectedPan.value = SMART_PAN_KEY;
          } else {
            target = panOptions.value.find((o) => o && normalize(o.label) === want) || null;
            if (target && target.key) selectedPan.value = target.key;
          }
	      }

	      const rules = compiledMagicEpisodeRules.value;
	      const cleanRules = compiledMagicEpisodeCleanRegexRules.value;
	      const exactIdx = wantedEpName ? pickExactResumeEpisodeIndexFromName(wantedEpName, cleanRules) : null;
	      if (exactIdx != null) {
        selectedEpisodeIndex.value = exactIdx;
      } else {
        let wanted = { season: 0, episode: 0 };
        if (wantedEpName) {
          wanted = extractSeasonEpisodeFromCandidates([wantedEpName], rules, cleanRules);
          if (!wanted.episode) wanted = parseLooseSeasonEpisodeFromText(wantedEpName);
        }
        if (!wanted.episode) wanted = { season: 0, episode: wantedIdx + 1 };

        selectedEpisodeIndex.value = pickResumeEpisodeIndex({
          wantedSeason: wanted.season,
          wantedEpisode: wanted.episode,
          wantedIndex: wantedIdx,
        });
	      }

	      resumeHistoryApplied.value = true;
	      if (prevPan !== selectedPan.value || prevIdx !== selectedEpisodeIndex.value) return;
	    }

    tryAutoStartPlayback();
  }
);

watch(
  () =>
    [
      hasMagicEpisodeRules.value ? '1' : '0',
      introLoading.value ? '1' : '0',
      introError.value ? '1' : '0',
      selectedPanKey.value,
      selectedEpisodes.value.length,
      allDisplayedEpisodes.value.length,
    ].join('|'),
  () => {
    if (introLoading.value) return;
    if (introError.value) return;
    if (!hasMagicEpisodeRules.value) {
      if (autoRawListMode.value) {
        autoRawListMode.value = false;
        rawListMode.value = false;
      }
      return;
    }
    if (selectedEpisodes.value.length && allDisplayedEpisodes.value.length === 0) {
      rawListMode.value = true;
      autoRawListMode.value = true;
      selectedEpisodeIndex.value = -1;
      return;
    }
    if (autoRawListMode.value && allDisplayedEpisodes.value.length) {
      rawListMode.value = false;
      autoRawListMode.value = false;
    }
  },
  { immediate: true }
);

watch(
  () => [props.siteKey, props.videoId].join('|'),
  () => {
    void loadFavoriteStatus();
  },
  { immediate: true }
);

watch(
  () => [selectedPanKey.value, selectedEpisodes.value.length, selectedEpisodeIndex.value].join('|'),
  () => {
    const total = selectedEpisodes.value.length;
    if (!total) {
      selectedEpisodeGroup.value = '';
      return;
    }
    const idx = selectedEpisodeIndex.value;
    const matches = episodeMatchByIndex.value;
    const hasMagic = hasMagicEpisodeRules.value;
    const m =
      Number.isFinite(idx) && idx >= 0 && matches && matches[idx] && typeof matches[idx] === 'object'
        ? matches[idx]
        : { season: 0, episode: 0 };
    const matchedNo = Number.isFinite(Number(m.episode)) ? Number(m.episode) : 0;
    const no = hasMagic && matchedNo > 0 ? matchedNo : (Number.isFinite(idx) && idx >= 0 ? idx : 0) + 1;
    const groups = episodeGroups.value;
    const found = groups.find((g) => no >= g.startNo && no <= g.endNo);
    const next = (found && found.key) || groups[0]?.key || '';
    if (next && next !== selectedEpisodeGroup.value) selectedEpisodeGroup.value = next;
    scheduleUpdateHiddenEpisodeGroups();
  }
);

const siteEpisodes = computed(() => {
  const list = panOptions.value;
  if (!list.length) return 0;
  let max = 0;
  list.forEach((s) => {
    const n = s && Array.isArray(s.episodes) ? s.episodes.length : 0;
    if (n > max) max = n;
  });
  return max;
});

const siteQuality = computed(() => {
  const fromStr = detail.value.playFrom != null ? String(detail.value.playFrom) : '';
  const urlStr = detail.value.playUrl != null ? String(detail.value.playUrl) : '';
  const hay = `${fromStr} ${urlStr}`.toUpperCase();
  if (/(2160P|2160|4K)/.test(hay)) return '4K';
  if (/(1080P|1080)/.test(hay)) return '1080P';
  if (/(720P|720)/.test(hay)) return '720P';
  return '';
});

const rawListItems = computed(() => {
  if (!rawListMode.value) return [];
  const eps = selectedEpisodes.value;
  if (!eps.length) return [];
  return eps.map((ep, idx) => {
    const url = ep && ep.url != null ? String(ep.url) : '';
    const rawNames = extractRawNamesFromEpisodeUrl(url);
    const text = (rawNames[0] || (ep && ep.name != null ? String(ep.name) : '') || '').trim() || `第${idx + 1}集`;
    return { key: `${idx}-${url}`, index: idx, text };
  });
});

const rawListPageOptions = computed(() => {
  if (!rawListMode.value) return [];
  if (!thirdPartyIsMobile.value) return [];
  const total = rawListItems.value.length;
  if (total <= RAW_LIST_PAGE_SIZE) return [];
  const pages = Math.ceil(total / RAW_LIST_PAGE_SIZE);
  const out = [];
  for (let p = 0; p < pages; p += 1) {
    const start = p * RAW_LIST_PAGE_SIZE + 1;
    const end = Math.min(total, (p + 1) * RAW_LIST_PAGE_SIZE);
    out.push({ page: p, label: `${start}-${end}` });
  }
  return out;
});

const rawListPagedItems = computed(() => {
  const items = rawListItems.value;
  const total = items.length;
  if (!rawListMode.value) return [];
  if (!thirdPartyIsMobile.value) return items;
  if (total <= RAW_LIST_PAGE_SIZE) return items;
  const p = Number.isFinite(Number(rawListPage.value)) ? Math.max(0, Math.floor(Number(rawListPage.value))) : 0;
  const pages = Math.max(1, Math.ceil(total / RAW_LIST_PAGE_SIZE));
  const page = Math.min(p, pages - 1);
  const startIdx = page * RAW_LIST_PAGE_SIZE;
  return items.slice(startIdx, startIdx + RAW_LIST_PAGE_SIZE);
});

watch(
  () => `${rawListMode.value ? '1' : '0'}|${thirdPartyIsMobile.value ? '1' : '0'}|${rawListItems.value.length}`,
  () => {
    rawListPage.value = 0;
  }
);

watch(
  () => `${rawListMode.value ? '1' : '0'}|${thirdPartyIsMobile.value ? '1' : '0'}|${selectedEpisodeIndex.value}`,
  () => {
    if (!rawListMode.value) return;
    if (!thirdPartyIsMobile.value) return;
    const idx = Number.isFinite(Number(selectedEpisodeIndex.value)) ? Math.floor(Number(selectedEpisodeIndex.value)) : 0;
    if (idx < 0) return;
    const nextPage = Math.floor(idx / RAW_LIST_PAGE_SIZE);
    if (nextPage !== rawListPage.value) rawListPage.value = nextPage;
  }
);

const selectEpisode = (idx) => {
  const n = Number(idx);
  if (!Number.isFinite(n) || n < 0) return;
  // If the user clicks the currently playing episode within the same pan, do nothing.
  // But if they switch pan (even same episode number), we must request a new play url.
  if (
    playingPanKey.value &&
    playingPanKey.value === selectedPanKey.value &&
    playingEpisodeIndex.value === n &&
    playerUrl.value
  ) {
    selectedEpisodeIndex.value = n;
    return;
  }
  selectedEpisodeIndex.value = n;
  requestPlay();
};

const onRawListSelectEpisode = (idx) => {
  selectEpisode(idx);
  if (!thirdPartyIsMobile.value) return;
  if (!rawListMode.value) return;
  try {
    const el = rawListViewEl.value;
    if (!el) return;
    const scrollTop = () => {
      try {
        if (typeof el.scrollTo === 'function') el.scrollTo({ top: 0, behavior: 'smooth' });
        else el.scrollTop = 0;
      } catch (_e) {
        try {
          el.scrollTop = 0;
        } catch (_e2) {}
      }
    };
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(() => window.requestAnimationFrame(scrollTop));
    } else {
      setTimeout(scrollTop, 0);
    }
  } catch (_e) {}
};

const extractIntroFromDetail = (data) => {
  const pick = (vod) => {
    if (!vod) return '';
    return (
      (vod.vod_content != null ? String(vod.vod_content) : '') ||
      (vod.content != null ? String(vod.content) : '') ||
      (vod.desc != null ? String(vod.desc) : '') ||
      ''
    ).trim();
  };

  if (!data) return '';
  if (Array.isArray(data.list) && data.list[0]) return pick(data.list[0]);
  if (data.data && Array.isArray(data.data.list) && data.data.list[0]) return pick(data.data.list[0]);
  if (data.vod) return pick(data.vod);
  return '';
};

const extractDetailFromResponse = (data) => {
  const first =
    (data && Array.isArray(data.list) && data.list[0]) ||
    (data && data.data && Array.isArray(data.data.list) && data.data.list[0]) ||
    (data && data.vod) ||
    null;

  const vod = first || {};
  const get = (k) => (vod && vod[k] != null ? String(vod[k]) : '').trim();
  const title = get('vod_name') || get('name') || get('title');
  const poster = get('vod_pic') || get('pic') || get('poster');
  const year = get('vod_year') || get('year');
  const type = get('vod_class') || get('vod_type') || get('type_name') || get('type');
  const remark = get('vod_remarks') || get('remark');
  const content =
    get('vod_content') || get('content') || get('desc');
  const playFrom = get('vod_play_from') || get('play_from') || get('vod_playfrom') || get('vod_play_froms');
  const playUrl = get('vod_play_url') || get('play_url') || get('vod_playurl') || get('vod_play_urls');

  return { title, poster, year, type, remark, content, playFrom, playUrl };
};

const detailFetchState = { key: '', seq: 0, inFlight: null };

const contentKeyFromProps = () => {
  const t = getStableContentKey();
  const y = String(props.videoYear || '').trim();
  const ty = String(props.searchType || '').trim();
  return [t, y, ty].join('|');
};

let lastContentKey = contentKeyFromProps();

const fetchDetailForCurrentVideo = async (opts = {}) => {
  const { updateIntro = false, updateMeta = false } = opts && typeof opts === 'object' ? opts : {};
  const id = (props.videoId || '').trim();
  if (!id) return;
  const api = (resolvedSpiderApiFinal.value || '').trim();
  if (!api) return;

  const apiBase = resolveCatApiBaseForPlay();
  const tvUser = props.bootstrap?.user?.username || '';
  const key = `${apiBase}::${tvUser}::${api}::${id}`;
  if (detailFetchState.inFlight && detailFetchState.key === key) {
    await detailFetchState.inFlight;
    return;
  }

  detailFetchState.seq += 1;
  const seqAtCall = detailFetchState.seq;
  detailFetchState.key = key;
  const shouldShowDetailLoading = !!(updateIntro || updateMeta || !detail.value.playFrom);
  if (shouldShowDetailLoading) {
    introLoading.value = true;
    introError.value = '';
  }

  detailFetchState.inFlight = (async () => {
    try {
      const raw = await requestCatSpider({
        apiBase,
        username: tvUser,
        action: 'detail',
        spiderApi: api,
        payload: { id },
      });
      if (seqAtCall !== detailFetchState.seq) return;
      const d = extractDetailFromResponse(raw);
      const prev = detail.value && typeof detail.value === 'object' ? detail.value : {};
      const shouldUpdateMeta = !!updateMeta;
      const shouldFillMeta = !prev.title || !prev.poster || !prev.year;
      const next = {
        ...prev,
        playFrom: d.playFrom,
        playUrl: d.playUrl,
      };
      if (shouldUpdateMeta || shouldFillMeta) {
        if (d.title) next.title = d.title;
        if (d.poster) next.poster = d.poster;
        if (d.year) next.year = d.year;
        if (d.type) next.type = d.type;
        if (d.remark) next.remark = d.remark;
        if (d.content) next.content = d.content;
      }
      detail.value = next;
      if (updateIntro || !introText.value) {
        const nextIntro = (d.content || extractIntroFromDetail(raw) || introText.value || '').trim();
        if (nextIntro) introText.value = nextIntro;
      }
    } catch (e) {
      const status = e && typeof e.status === 'number' ? e.status : 0;
      const msg = (e && e.message) || '请求失败';
      if (shouldShowDetailLoading && seqAtCall === detailFetchState.seq) {
        introError.value = status ? `HTTP ${status}：${msg}` : msg;
      }
    } finally {
      if (shouldShowDetailLoading && seqAtCall === detailFetchState.seq) introLoading.value = false;
      if (detailFetchState.key === key && detailFetchState.seq === seqAtCall) detailFetchState.inFlight = null;
    }
  })();
  await detailFetchState.inFlight;
  tryAutoStartPlayback();
};

const searchTypeLabel = computed(() => {
  switch ((props.searchType || '').trim()) {
    case 'movie':
      return '电影';
    case 'tv':
      return '电视剧';
    case 'anime':
      return '动漫';
    case 'show':
      return '综艺';
    default:
      return '';
  }
});

const onPanDocDown = (e) => {
  if (!panDropdownOpen.value) return;
  const el = panDropdownEl.value;
  if (el && e && e.target && el.contains(e.target)) return;
  panDropdownOpen.value = false;
};

const onPanKeyDown = (e) => {
  if (!panDropdownOpen.value) return;
  if (e && e.key === 'Escape') panDropdownOpen.value = false;
};

const onEpisodeGroupDocDown = (e) => {
  if (!episodeGroupMoreOpen.value) return;
  const el = episodeGroupMoreEl.value;
  if (el && e && e.target && el.contains(e.target)) return;
  episodeGroupMoreOpen.value = false;
};

const onEpisodeGroupMoreEnter = () => {
  // Avoid opening immediately on mount when the element appears under a stationary cursor.
  if (!episodeGroupHoverArmed.value) return;
  episodeGroupMoreOpen.value = true;
};

onMounted(() => {
  initPlayPage();
  void loadResumeFromHistory();
  loadAggregatedSourcesFromStorage();

  // iPhone edge-swipe back (PWA-like behavior): swipe from left edge to go back.
  // Keep this conservative to avoid interfering with scroll/player gestures.
  try {
    const ua = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
    const isIphone = /iPhone|iPod/i.test(ua);
    const root = document.getElementById('playPage');
    if (isIphone && root) {
      let armed = false;
      let startX = 0;
      let startY = 0;
      let shouldGoBack = false;
      const EDGE_PX = 20;
      const TRIGGER_DX = 70;

      const getPoint = (e) => {
        const t = e && e.touches && e.touches[0] ? e.touches[0] : null;
        if (!t) return null;
        return { x: t.clientX || 0, y: t.clientY || 0 };
      };

      const onTouchStart = (e) => {
        const p = getPoint(e);
        if (!p) return;
        startX = p.x;
        startY = p.y;
        armed = startX <= EDGE_PX;
        shouldGoBack = false;
      };

      const onTouchMove = (e) => {
        if (!armed) return;
        const p = getPoint(e);
        if (!p) return;
        const dx = p.x - startX;
        const dy = p.y - startY;
        if (dx <= 0) return;

        // If vertical movement dominates early, cancel to preserve scrolling.
        if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
          armed = false;
          shouldGoBack = false;
          return;
        }

        if (dx >= TRIGGER_DX && dx > Math.abs(dy) * 1.4) {
          shouldGoBack = true;
          try {
            e.preventDefault();
          } catch (_e) {}
        }
      };

      const reset = () => {
        armed = false;
        shouldGoBack = false;
      };

      const onTouchEnd = () => {
        if (armed && shouldGoBack) exitPlay();
        reset();
      };

      root.addEventListener('touchstart', onTouchStart, { passive: true });
      root.addEventListener('touchmove', onTouchMove, { passive: false });
      root.addEventListener('touchend', onTouchEnd, { passive: true });
      root.addEventListener('touchcancel', reset, { passive: true });
      cleanupFns.push(() => root.removeEventListener('touchstart', onTouchStart));
      cleanupFns.push(() => root.removeEventListener('touchmove', onTouchMove));
      cleanupFns.push(() => root.removeEventListener('touchend', onTouchEnd));
      cleanupFns.push(() => root.removeEventListener('touchcancel', reset));
    }
  } catch (_e) {}

  void fetchDetailForCurrentVideo({ updateIntro: !introText.value, updateMeta: true });

  // Episode panel resizer (desktop)
  try {
    const grid = document.getElementById('playGrid');
    const resizer = document.getElementById('episodePanelResizer');
    const panel = document.getElementById('episodePanel');
    if (grid && resizer && panel) {
      const STORAGE_KEY = 'meowfilm_episode_panel_width';
      let dragging = false;
      let startX = 0;
      let startW = 0;
      let pendingW = 0;
      let rafId = 0;
      let currentW = 0;

      const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
      const setWidth = (w) => {
        const next = clamp(w, 220, 520);
        currentW = next;
        grid.style.setProperty('--episode-panel-width', `${next}px`);
      };

      // Restore saved width (per-browser)
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const n = raw != null ? Number(raw) : NaN;
        if (Number.isFinite(n) && n > 0) setWidth(n);
      } catch (_e) {}

      const onMove = (e) => {
        if (!dragging) return;
        const x = e && typeof e.clientX === 'number' ? e.clientX : 0;
        const dx = x - startX;
        pendingW = clamp(startW - dx, 220, 520);
        if (rafId) return;
        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          setWidth(pendingW);
        });
      };

      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
        try {
          if (currentW) {
            localStorage.setItem(STORAGE_KEY, String(currentW));
          }
        } catch (_e) {}
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        grid.classList.remove('is-resizing');
        panel.classList.remove('is-resizing');
        window.removeEventListener('mousemove', onMove, true);
        window.removeEventListener('mouseup', onUp, true);
      };

      const onDown = (e) => {
        if (grid.classList.contains('episode-panel-collapsed')) return;
        dragging = true;
        startX = e.clientX;
        startW = panel.getBoundingClientRect().width || 280;
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
        grid.classList.add('is-resizing');
        panel.classList.add('is-resizing');
        window.addEventListener('mousemove', onMove, true);
        window.addEventListener('mouseup', onUp, true);
      };

      resizer.addEventListener('mousedown', onDown);
      cleanupFns.push(() => {
        try {
          onUp();
        } catch (_e) {}
        resizer.removeEventListener('mousedown', onDown);
      });
    }
  } catch (_e) {}

  // Episode grid columns adapt to available width
  try {
    const episodeButtons = document.getElementById('episodeButtons');
    if (episodeButtons) {
      const minButtonWidth = 44; // matches --episode-btn-size
      const clampCols = (v) => Math.max(3, Math.min(10, v));
      const calcCols = () => {
        const w = episodeButtons.clientWidth || 0;
        if (!w) return;
        const cs = window.getComputedStyle ? window.getComputedStyle(episodeButtons) : null;
        const gap = cs ? parseFloat(cs.columnGap || cs.gap || '12') : 12;
        const cols = clampCols(Math.floor((w + gap) / (minButtonWidth + gap)));
        episodeButtons.style.setProperty('--episode-cols', String(cols));
      };

      calcCols();
      window.addEventListener('resize', calcCols);
      cleanupFns.push(() => window.removeEventListener('resize', calcCols));
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => calcCols());
        ro.observe(episodeButtons);
        cleanupFns.push(() => ro.disconnect());
      }
    }
  } catch (_e) {}

  document.addEventListener('mousedown', onPanDocDown, true);
  document.addEventListener('keydown', onPanKeyDown, true);
  document.addEventListener('mousedown', onEpisodeGroupDocDown, true);
  cleanupFns.push(() => document.removeEventListener('mousedown', onEpisodeGroupDocDown, true));

  // Keep episode panel height aligned to the 16:9 player height on desktop,
  // and prevent tall episode lists from expanding the whole page.
  try {
    const playerBox = document.querySelector('.tv-player-stack') || document.querySelector('.play-video-ratio');
    const panel = document.getElementById('episodePanel');
    if (playerBox && panel && typeof ResizeObserver !== 'undefined') {
      const apply = () => {
        try {
          if (window.innerWidth < 768) {
            panel.style.removeProperty('height');
            return;
          }
          const h = playerBox.getBoundingClientRect().height;
          if (!h) return;
          panel.style.height = `${Math.round(h)}px`;
        } catch (_e) {}
      };
      // Apply a few times to cover first render/layout & async font/layout shifts.
      apply();
      window.requestAnimationFrame(() => apply());
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => apply()));
      const ro = new ResizeObserver(() => apply());
      ro.observe(playerBox);
      window.addEventListener('resize', apply);
      cleanupFns.push(() => ro.disconnect());
      cleanupFns.push(() => window.removeEventListener('resize', apply));
    }
  } catch (_e) {}

  // Episode group overflow (hover dropdown for hidden group tabs)
	  try {
	    const el = episodeGroupTabsEl.value;
	    if (el) {
	      const onResize = () => scheduleUpdateHiddenEpisodeGroups();
	      const onScroll = () => scheduleUpdateHiddenEpisodeGroups();
	      window.addEventListener('resize', onResize);
	      el.addEventListener('scroll', onScroll, { passive: true });
	      cleanupFns.push(() => window.removeEventListener('resize', onResize));
	      cleanupFns.push(() => el.removeEventListener('scroll', onScroll));

      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => onResize());
        ro.observe(el);
        cleanupFns.push(() => ro.disconnect());
      }

	      scheduleUpdateHiddenEpisodeGroups();
	    }
	  } catch (_e) {}

  // Arm hover-open behavior after the first real mouse move (prevents default-open on mount).
  try {
    const arm = () => {
      episodeGroupHoverArmed.value = true;
      document.removeEventListener('mousemove', arm, true);
    };
    document.addEventListener('mousemove', arm, true);
    cleanupFns.push(() => document.removeEventListener('mousemove', arm, true));
  } catch (_e) {}

  // Player prev/next episode buttons
  try {
    const onEpisodeDelta = (e) => {
      const delta = e && e.detail ? Number(e.detail.delta) : 0;
      if (!Number.isFinite(delta) || delta === 0) return;
      const total = selectedEpisodes.value.length;
      if (!total) return;
      const next = Math.max(0, Math.min(total - 1, selectedEpisodeIndex.value + (delta > 0 ? 1 : -1)));
      if (next === selectedEpisodeIndex.value) return;
      selectEpisode(next);
    };
    window.addEventListener('tvplayer:episode', onEpisodeDelta);
    cleanupFns.push(() => window.removeEventListener('tvplayer:episode', onEpisodeDelta));
  } catch (_e) {}
});

watch(
  () => getStableContentKey(),
  () => {
    if (sourcesLoading.value) return;
    loadAggregatedSourcesFromStorage();
  },
  { immediate: true }
);

watch(
  () => activeTab.value,
  async (v) => {
    if (v !== 'sources') return;
    if (sourcesLoading.value) return;
    loadAggregatedSourcesFromStorage();
    // If we already have sources from search storage, do not auto-fetch.
    if (aggregatedSources.value && aggregatedSources.value.length) {
      await scrollSourcesToActive({ behavior: 'auto' });
      return;
    }
    // Avoid repeatedly spamming search when users just toggle tabs.
    if (sourcesSearchedOnce.value) {
      await scrollSourcesToActive({ behavior: 'auto' });
      return;
    }
    await fetchAggregatedSourcesExactMatches();
    await scrollSourcesToActive({ behavior: 'auto' });
  }
);

watch(
  () => [props.siteKey, props.videoId].join('|'),
  () => {
    initialAutoPlayTriggered.value = false;
    resumeHistoryState.seq += 1;
    detailFetchState.seq += 1;
    const nextContentKey = contentKeyFromProps();
    const isNewContent = !!nextContentKey && nextContentKey !== lastContentKey;
    lastContentKey = nextContentKey;

    // Only invalidate the aggregated-source search when the *content* changes.
    // Switching sources within the same content should not restart a full search.
    if (isNewContent) {
      invalidateSourcesSearch();
      sourcesSearchedOnce.value = false;
      sourcesError.value = '';
    }

    const prevIdx = Number.isFinite(selectedEpisodeIndex.value) ? Math.floor(selectedEpisodeIndex.value) : 0;
    if (isNewContent) {
      resetForNewVideo();
      loadAggregatedSourcesFromStorage();
      void fetchDetailForCurrentVideo({ updateIntro: true, updateMeta: true });
    } else {
      resetForNewSource();
      selectedEpisodeIndex.value = prevIdx >= 0 ? prevIdx : 0;
      void fetchDetailForCurrentVideo({ updateIntro: false, updateMeta: false });
    }
    void loadResumeFromHistory();
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  invalidateSourcesSearch();
  resumeHistoryState.seq += 1;
  try {
    if (hiddenEpisodeGroupsRaf) cancelAnimationFrame(hiddenEpisodeGroupsRaf);
    hiddenEpisodeGroupsRaf = 0;
  } catch (_e) {}
  cleanupFns.splice(0).forEach((fn) => {
    try {
      fn();
    } catch (_e) {}
  });
  document.removeEventListener('mousedown', onPanDocDown, true);
  document.removeEventListener('keydown', onPanKeyDown, true);
  document.removeEventListener('mousedown', onEpisodeGroupDocDown, true);
});

watch(
  () => `${panOptions.value.map((o) => o.key).join(',')}|${smartListAvailable.value ? '1' : '0'}`,
  () => {
    if (selectedPan.value === SMART_PAN_KEY) {
      if (smartListAvailable.value) return;
      selectedPan.value = '';
      return;
    }
    const list = panOptions.value;
    if (!list.length) {
      selectedPan.value = '';
      return;
    }
    if (!selectedPan.value) return;
    const exists = list.some((o) => o && o.key === selectedPan.value);
    if (!exists) selectedPan.value = '';
  }
);
</script>

<style>
@media (min-width: 768px) {
  #playGrid {
    grid-template-columns: minmax(0, 1fr) var(--episode-panel-width, 280px);
  }

  #playGrid.episode-panel-collapsed {
    grid-template-columns: minmax(0, 1fr);
  }

  #playerArea {
    grid-column: 1 / 2 !important;
  }

  #episodePanel {
    grid-column: 2 / 3 !important;
    min-height: 0;
  }

  #playGrid.episode-panel-collapsed #playerArea {
    grid-column: 1 / -1 !important;
  }

  #episodeButtons {
    display: grid;
    grid-template-columns: repeat(var(--episode-cols, 5), var(--episode-btn-size, 44px));
    justify-content: start;
  }
}

.episode-num-btn {
  width: var(--episode-btn-size, 44px);
  height: var(--episode-btn-size, 44px);
  padding: 0;
}

.play-video-ratio {
  position: relative;
  width: 100%;
  background: #000;
  min-height: 240px;
}

.play-video-ratio::before {
  content: "";
  display: block;
  padding-top: 56.25%;
}

.play-video-ratio__inner {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.tv-thirdparty-btn,
.tv-thirdparty-expand {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.6);
  color: rgba(55, 65, 81, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: transform 0.12s ease, background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;
  user-select: none;
}

.tv-thirdparty-btn:hover,
.tv-thirdparty-expand:hover {
  background: rgba(255, 255, 255, 0.8);
}

.tv-thirdparty-btn:active,
.tv-thirdparty-expand:active {
  transform: translateY(1px);
}

.tv-thirdparty-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.tv-thirdparty-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.tv-thirdparty-expand__ico {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.tv-thirdparty-expand__ico--open {
  transform: rotate(180deg);
}

.dark .tv-thirdparty-btn,
.dark .tv-thirdparty-expand {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.07);
  color: rgba(229, 231, 235, 1);
  box-shadow: none;
}

.dark .tv-thirdparty-btn:hover,
.dark .tv-thirdparty-expand:hover {
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 767px) {
  .tv-thirdparty-bar__inner {
    position: relative;
    justify-content: center;
    padding-left: 48px;
    padding-right: 48px;
  }

  .tv-thirdparty-expand {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
}

/* iOS Safari: videos can go "audio-only black screen" when their parent clips (border-radius + overflow hidden).
   On iOS, avoid clipping the video element; keep layout responsive without relying on fixed pixels. */
@supports (-webkit-touch-callout: none) {
  .play-video-ratio {
    border-radius: 0 !important;
    overflow: visible !important;
    box-shadow: none !important;
  }
}

.episode-season-bar {
  margin-bottom: 10px;
}

.episode-season-tabs,
.episode-group-tabs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 2px 0;
  scrollbar-width: none;
}

.episode-season-tabs::-webkit-scrollbar,
.episode-group-tabs::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.episode-season-btn,
.episode-group-btn {
  flex: 0 0 auto;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(0, 0, 0, 0.04);
  color: rgba(107, 114, 128, 1);
  font-size: 12px;
  font-weight: 700;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  white-space: nowrap;
}

.episode-season-btn:hover,
.episode-group-btn:hover {
  background: rgba(0, 0, 0, 0.06);
}

.episode-season-btn[data-active='true'],
.episode-group-btn[data-active='true'] {
  background: rgba(34, 197, 94, 0.16);
  border-color: rgba(34, 197, 94, 0.4);
  color: rgba(22, 163, 74, 1);
}

.dark .episode-season-btn,
.dark .episode-group-btn {
  background: rgba(255, 255, 255, 0.06);
}

.dark .episode-season-btn {
  border-color: rgba(255, 255, 255, 0.12);
  color: rgba(209, 213, 219, 1);
}

.dark .episode-season-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}

.episode-group-bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.episode-group-tabs {
  flex: 1 1 auto;
  min-width: 0;
}

.episode-group-more {
  position: static;
  flex: 0 0 auto;
}

.episode-group-more__btn {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.6);
  color: rgba(55, 65, 81, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.episode-group-more__btn:hover {
  background: rgba(255, 255, 255, 0.8);
}

.episode-group-more__menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  max-height: 240px;
  overflow: auto;
  padding: 8px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
  z-index: 60;
  display: none;
}

.episode-group-more__menu.episode-group-more__menu--open {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.episode-group-more__item {
  width: 100%;
  height: 34px;
  border-radius: 12px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: rgba(31, 41, 55, 1);
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  white-space: nowrap;
}

.episode-group-more__item:hover {
  background: rgba(0, 0, 0, 0.06);
}

.episode-group-more__item[data-active='true'] {
  background: rgba(34, 197, 94, 0.16);
  border-color: rgba(34, 197, 94, 0.4);
  color: rgba(21, 128, 61, 1);
}

.dark .episode-group-btn {
  border-color: rgba(255, 255, 255, 0.14);
  color: rgba(156, 163, 175, 1);
}

.dark .episode-group-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dark .episode-season-btn[data-active='true'],
.dark .episode-group-btn[data-active='true'] {
  background: rgba(34, 197, 94, 0.18);
  color: rgba(74, 222, 128, 1);
}

.dark .episode-season-btn[data-active='true'] {
  border-color: rgba(34, 197, 94, 0.42);
}

.dark .episode-group-btn[data-active='true'] {
  border-color: rgba(34, 197, 94, 0.55);
}

.dark .episode-group-more__btn {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.08);
  color: rgba(229, 231, 235, 1);
  box-shadow: none;
}

.dark .episode-group-more__menu {
  background: #0f172a;
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.55);
}

.dark .episode-group-more__item {
  color: rgba(229, 231, 235, 1);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .episode-group-more__item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dark .episode-group-more__item[data-active='true'] {
  background: rgba(34, 197, 94, 0.18);
  border-color: rgba(34, 197, 94, 0.55);
  color: rgba(74, 222, 128, 1);
}

.episode-resizer {
  position: absolute;
  left: -14px;
  top: 10px;
  bottom: 10px;
  width: 28px;
  cursor: col-resize;
  z-index: 20;
}

.episode-resizer::before {
  content: "";
  position: absolute;
  left: 13px;
  top: 0;
  bottom: 0;
  width: 2px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.14);
  opacity: 0;
  transition: opacity 0.15s ease, background-color 0.15s ease;
}

.episode-resizer:hover::before {
  opacity: 0.9;
}

.dark .episode-resizer::before {
  background: rgba(255, 255, 255, 0.22);
}

#playGrid.is-resizing,
#episodePanel.is-resizing {
  transition: none !important;
}

#playGrid.episode-panel-collapsed .episode-resizer {
  display: none;
}

.episode-control {
  height: 34px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.65);
  color: rgba(55, 65, 81, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  font-size: 13px;
  font-weight: 500;
}

.episode-control:hover {
  background: rgba(255, 255, 255, 0.78);
}

.episode-control:focus {
  outline: none;
  border-color: rgba(34, 197, 94, 0.55);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.16), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.episode-control--btn {
  padding: 0 12px;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.episode-control--btn[data-active='true'] {
  border-color: rgba(34, 197, 94, 0.45);
  background: rgba(34, 197, 94, 0.12);
  color: rgba(17, 24, 39, 1);
}

.episode-control--btn:hover {
  background: rgba(255, 255, 255, 0.78);
}

.episode-control--btn:active {
  transform: translateY(1px);
}

.dark .episode-control {
  border-color: rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.07);
  color: rgba(229, 231, 235, 1);
  box-shadow: none;
}

.dark .episode-control:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dark .episode-control--btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dark .episode-control--btn[data-active='true'] {
  border-color: rgba(34, 197, 94, 0.55);
  background: rgba(34, 197, 94, 0.18);
  color: rgba(243, 244, 246, 1);
}

.dark .episode-control:focus {
  border-color: rgba(34, 197, 94, 0.6);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.22);
}

#episodeSelector {
  overflow-x: hidden;
  overflow-y: visible;
}

.episode-tab-header {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.06);
}

.dark .episode-tab-header {
  background: rgba(255, 255, 255, 0.06);
}

.play-pan-dropdown .custom-dropdown-btn {
  padding: 8px 12px;
  border-radius: 12px;
  height: 34px;
  line-height: 18px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dark .play-pan-dropdown .custom-dropdown-btn {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.16);
  color: rgba(229, 231, 235, 1);
  box-shadow: none;
}

.dark .play-pan-dropdown .custom-dropdown-list {
  background: #0f172a;
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
}

.dark .play-pan-dropdown .custom-dropdown-item {
  color: rgba(229, 231, 235, 1);
}

.dark .play-pan-dropdown .custom-dropdown-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.dark .play-pan-dropdown .custom-dropdown-item.active {
  background: rgba(34, 197, 94, 0.16);
  color: rgba(74, 222, 128, 1);
}

.play-pan-dropdown .custom-dropdown-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.play-detail__inner {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.play-detail__poster {
  flex: 0 0 200px;
}

.play-detail__posterWrap {
  position: relative;
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.04);
  aspect-ratio: 2 / 3;
}

.play-detail__posterSkeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.08) 50%, rgba(0, 0, 0, 0.04) 100%);
  background-size: 200% 100%;
  animation: play-skeleton 1.2s ease-in-out infinite;
}

.play-detail__posterImg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-detail__posterFallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(107, 114, 128, 1);
  font-size: 13px;
}

.play-detail__info {
  flex: 1 1 auto;
  min-width: 0;
}

.play-detail__titleRow {
  display: flex;
  align-items: center;
  gap: 12px;
}

.play-detail__favBtn {
  flex: 0 0 auto;
  width: 38px;
  height: 38px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(148, 163, 184, 0.45);
  background: rgba(255, 255, 255, 0.72);
  color: rgba(71, 85, 105, 1);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
  transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;
}
.play-detail__favBtn:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
}
.play-detail__favBtn.is-active {
  border-color: rgba(236, 72, 153, 0.35);
  color: rgba(236, 72, 153, 1);
}
.dark .play-detail__favBtn {
  background: rgba(15, 23, 42, 0.55);
  border-color: rgba(255, 255, 255, 0.12);
  color: rgba(226, 232, 240, 1);
  box-shadow: none;
}
.dark .play-detail__favBtn:hover {
  background: rgba(15, 23, 42, 0.75);
}
.dark .play-detail__favBtn.is-active {
  border-color: rgba(244, 114, 182, 0.35);
  color: rgba(244, 114, 182, 1);
}

.play-detail__title {
  flex: 0 1 auto;
  min-width: 0;
  max-width: calc(100% - 54px);
  font-size: 26px;
  line-height: 1.2;
  font-weight: 800;
  color: rgba(17, 24, 39, 1);
  letter-spacing: -0.02em;
  margin: 0;
}

.play-detail__meta {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.play-pill {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(55, 65, 81, 1);
  background: rgba(0, 0, 0, 0.06);
}

.play-detail__desc {
  margin-top: 14px;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(31, 41, 55, 0.92);
}

@media (max-width: 768px) {
  .play-detail__inner {
    flex-direction: column;
  }
  .play-detail__poster {
    flex-basis: auto;
    width: 220px;
  }
  .play-detail__title {
    font-size: 22px;
  }
}

.dark .play-detail__posterWrap {
  background: rgba(255, 255, 255, 0.06);
}

.dark .play-detail__posterSkeleton {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.06) 100%);
  background-size: 200% 100%;
}

.dark .play-detail__posterFallback {
  color: rgba(156, 163, 175, 1);
}

.dark .play-detail__title {
  color: rgba(243, 244, 246, 1);
}

.dark .play-pill {
  color: rgba(229, 231, 235, 1);
  background: rgba(255, 255, 255, 0.08);
}

.dark .play-detail__desc {
  color: rgba(229, 231, 235, 0.9);
}

@keyframes play-skeleton {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.raw-list__hint {
  padding: 10px 8px;
  font-size: 13px;
  color: rgba(107, 114, 128, 1);
  text-align: center;
}

.raw-list__hint--error {
  color: rgba(239, 68, 68, 1);
}

.raw-list__items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.raw-list__row {
  cursor: pointer;
  appearance: none;
  outline: none;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.55);
  color: rgba(31, 41, 55, 1);
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}

.raw-list__row:hover {
  background: rgba(255, 255, 255, 0.72);
}

.raw-list__text {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
}

.raw-list__row--active {
  border-color: rgba(34, 197, 94, 0.45);
  background: rgba(34, 197, 94, 0.12);
}

.source-card--active {
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.25);
}

.source-card--idle {
  cursor: pointer;
}

.source-card--idle:hover {
  background: rgba(0, 0, 0, 0.04);
}

.dark .source-card--active {
  background: rgba(34, 197, 94, 0.18);
  border-color: rgba(34, 197, 94, 0.28);
}

.dark .source-card--idle:hover {
  background: rgba(255, 255, 255, 0.08);
}

.source-card__cover {
  background: rgba(0, 0, 0, 0.06);
}

.dark .source-card__cover {
  background: rgba(255, 255, 255, 0.08);
}

.source-more-btn {
  width: 100%;
  height: 40px;
  border-radius: 12px;
  border: 1px dashed rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.45);
  color: rgba(107, 114, 128, 1);
  font-size: 13px;
  font-weight: 700;
}

.dark .source-more-btn {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(156, 163, 175, 1);
}

.dark .raw-list__hint {
  color: rgba(156, 163, 175, 1);
}

.dark .raw-list__row {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(229, 231, 235, 1);
  box-shadow: none;
}

.dark .raw-list__row:hover {
  background: rgba(255, 255, 255, 0.09);
}

.dark .raw-list__row--active {
  border-color: rgba(34, 197, 94, 0.55);
  background: rgba(34, 197, 94, 0.18);
}

.tv-spinner {
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: rgba(255, 255, 255, 0.95);
  animation: tvspin 0.9s linear infinite;
}

@keyframes tvspin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.tv-center-loading {
  flex: 1;
  min-height: 120px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 0;
  color: rgba(107, 114, 128, 1);
}

.dark .tv-center-loading {
  color: rgba(156, 163, 175, 1);
}

.tv-center-loading__text {
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.tv-episode-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: rgba(107, 114, 128, 1);
}

.dark .tv-episode-overlay {
  color: rgba(156, 163, 175, 1);
}

.tv-episode-overlay__inner {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
}

.play-player-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10010;
  padding: 18px;
  background: rgb(2, 6, 23);
  backdrop-filter: none;
}

.play-player-overlay__panel {
  /* Constrain overall layout to a fixed "red box" area */
  width: min(760px, 92%);
  min-height: 200px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-areas:
    "mark ."
    "mark text"
    "mark progress"
    "mark .";
  grid-template-rows: 1fr auto auto 1fr;
  column-gap: 22px;
  row-gap: 0;
  align-items: stretch;
  padding: 0;
  border-radius: 22px;
  background: transparent;
  border: none;
  box-shadow: none;
  backdrop-filter: none;
}

.play-player-overlay__mark {
  grid-area: mark;
  align-self: stretch;
  justify-self: start;
  display: block;
  height: 100%;
  aspect-ratio: 1 / 1;
}

.play-player-overlay__mark svg {
  height: 100%;
  width: 100%;
  display: block;
  shape-rendering: geometricPrecision;
}

.play-player-overlay__text {
  grid-area: text;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0;
  padding-right: 10px;
}

.play-player-overlay__status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: rgba(248, 250, 252, 0.96);
}

.play-player-overlay--error .play-player-overlay__status {
  color: rgba(254, 226, 226, 0.98);
}

.play-player-overlay__statusText {
  font-size: 26px;
  font-weight: 900;
  letter-spacing: 0.2px;
  line-height: 1.05;
}

.play-player-overlay__spinner {
  border-color: rgba(255, 255, 255, 0.26);
  border-top-color: rgba(255, 255, 255, 0.96);
}

.play-player-overlay__progress {
  grid-area: progress;
  width: min(520px, 100%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 14px;
  align-self: start;
  justify-self: center;
}

.play-player-overlay__track {
  height: 6px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
}

.play-player-overlay__fill {
  height: 100%;
  width: calc(var(--play-stage-p, 0) * 100%);
  border-radius: 9999px;
  background: linear-gradient(90deg, #0EA5E9, #22C55E, #6366F1);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.14) inset;
}

.play-player-overlay--error .play-player-overlay__fill {
  background: linear-gradient(90deg, rgba(248, 113, 113, 0.95), rgba(251, 146, 60, 0.95));
}

@media (max-width: 520px) {
  .play-player-overlay__panel {
    width: min(520px, 92%);
    min-height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 16px 14px 14px;
  }

  .play-player-overlay__status {
    justify-content: center;
  }

  .play-player-overlay__progress {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .play-player-overlay__text {
    padding-right: 0;
    gap: 0;
  }

  .play-player-overlay__statusText {
    font-size: 20px;
  }

  .play-player-overlay__mark {
    height: 96px;
  }
}

</style>
