#############################################################################
# Makefile for building: game
# Generated by qmake (3.0) (Qt 5.0.2) on: ?? 1. ??? 03:13:30 2013
# Project:  ../game/game.pro
# Template: app
# Command: C:/Qt/Qt5.0.2/5.0.2/mingw47_32/bin/qmake.exe -spec win32-g++ CONFIG+=debug -o Makefile ../game/game.pro
#############################################################################

MAKEFILE      = Makefile

first: debug
install: debug-install
uninstall: debug-uninstall
QMAKE         = C:/Qt/Qt5.0.2/5.0.2/mingw47_32/bin/qmake.exe
DEL_FILE      = rm -f
CHK_DIR_EXISTS= test -d
MKDIR         = mkdir -p
COPY          = cp -f
COPY_FILE     = cp -f
COPY_DIR      = cp -f -R
INSTALL_FILE  = $(COPY_FILE)
INSTALL_PROGRAM = $(COPY_FILE)
INSTALL_DIR   = $(COPY_DIR)
DEL_FILE      = rm -f
SYMLINK       = 
DEL_DIR       = rmdir
MOVE          = mv -f
SUBTARGETS    =  \
		debug \
		release


debug: FORCE
	$(MAKE) -f $(MAKEFILE).Debug
debug-make_first: FORCE
	$(MAKE) -f $(MAKEFILE).Debug 
debug-all: FORCE
	$(MAKE) -f $(MAKEFILE).Debug all
debug-clean: FORCE
	$(MAKE) -f $(MAKEFILE).Debug clean
debug-distclean: FORCE
	$(MAKE) -f $(MAKEFILE).Debug distclean
debug-install: FORCE
	$(MAKE) -f $(MAKEFILE).Debug install
debug-uninstall: FORCE
	$(MAKE) -f $(MAKEFILE).Debug uninstall
release: FORCE
	$(MAKE) -f $(MAKEFILE).Release
release-make_first: FORCE
	$(MAKE) -f $(MAKEFILE).Release 
release-all: FORCE
	$(MAKE) -f $(MAKEFILE).Release all
release-clean: FORCE
	$(MAKE) -f $(MAKEFILE).Release clean
release-distclean: FORCE
	$(MAKE) -f $(MAKEFILE).Release distclean
release-install: FORCE
	$(MAKE) -f $(MAKEFILE).Release install
release-uninstall: FORCE
	$(MAKE) -f $(MAKEFILE).Release uninstall

Makefile: ../game/game.pro ../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/win32-g++/qmake.conf ../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/spec_pre.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/device_config.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/common/shell-unix.conf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/qconfig.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_axbase.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_axcontainer.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_axserver.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_bootstrap.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_clucene.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_concurrent.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_core.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_declarative.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_designer.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_designercomponents.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_gui.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_help.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_multimedia.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_multimediawidgets.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_network.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_opengl.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_platformsupport.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_printsupport.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_qml.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_qmldevtools.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_qmltest.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_qtmultimediaquicktools.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_quick.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_quickparticles.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_script.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_scripttools.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_sql.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_svg.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_testlib.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_uitools.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_v8.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_webkit.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_webkitwidgets.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_widgets.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_xml.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_xmlpatterns.pri \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/qt_functions.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/qt_config.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/win32-g++/qmake.conf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/spec_post.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/exclusive_builds.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/default_pre.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/win32/default_pre.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/resolve_config.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/default_post.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/win32/rtti.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/warn_on.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/win32/windows.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/testcase_targets.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/exceptions.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/yacc.prf \
		../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/lex.prf \
		../game/game.pro
	$(QMAKE) -spec win32-g++ CONFIG+=debug -o Makefile ../game/game.pro
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/spec_pre.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/device_config.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/common/shell-unix.conf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/qconfig.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_axbase.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_axcontainer.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_axserver.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_bootstrap.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_clucene.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_concurrent.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_core.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_declarative.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_designer.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_designercomponents.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_gui.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_help.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_multimedia.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_multimediawidgets.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_network.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_opengl.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_platformsupport.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_printsupport.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_qml.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_qmldevtools.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_qmltest.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_qtmultimediaquicktools.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_quick.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_quickparticles.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_script.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_scripttools.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_sql.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_svg.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_testlib.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_uitools.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_v8.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_webkit.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_webkitwidgets.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_widgets.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_xml.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/modules/qt_lib_xmlpatterns.pri:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/qt_functions.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/qt_config.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/win32-g++/qmake.conf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/spec_post.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/exclusive_builds.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/default_pre.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/win32/default_pre.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/resolve_config.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/default_post.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/win32/rtti.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/warn_on.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/win32/windows.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/testcase_targets.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/exceptions.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/yacc.prf:
../../../../../../Qt/Qt5.0.2/5.0.2/mingw47_32/mkspecs/features/lex.prf:
../game/game.pro:
qmake: FORCE
	@$(QMAKE) -spec win32-g++ CONFIG+=debug -o Makefile ../game/game.pro

qmake_all: FORCE

make_first: debug-make_first release-make_first FORCE
all: debug-all release-all FORCE
clean: debug-clean release-clean FORCE
distclean: debug-distclean release-distclean FORCE
	-$(DEL_FILE) Makefile

check: first
FORCE:

$(MAKEFILE).Debug: Makefile
$(MAKEFILE).Release: Makefile
